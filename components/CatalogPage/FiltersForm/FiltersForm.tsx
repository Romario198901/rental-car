'use client';
import { Form, Formik, FormikHelpers } from 'formik';
import Select from 'react-select';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllFilters } from '@/lib/api/clientApi';
import { useState } from 'react';
import * as Yup from 'yup';
import Loader from '@/components/common/Loader/Loader';
import css from './FiltersForm.module.css';

interface FiltersFormValues {
  brand: string;
  price: string;
  minMileage: number;
  maxMileage: number;
}
interface OptionType {
  value: string;
  label: string;
}

const emptyValues: FiltersFormValues = {
  brand: 'Choose a brand',
  price: 'Chose a price',
  minMileage: 0,
  maxMileage: 0,
};
const FiltersSchema = Yup.object().shape({
  brand: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').notRequired(),
  price: Yup.string().max(500, 'Too Long!').notRequired(),
  minMileage: Yup.number().integer().notRequired(),
  maxMileage: Yup.number().integer().notRequired(),
});
export default function FiltersForm() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['filters'],
    queryFn: () => getAllFilters(),
    placeholderData: keepPreviousData,
  });
  const brandOptions =
    data?.brands?.map(brand => ({
      value: brand,
      label: brand,
    })) ?? [];

  const handleSubmit = async (
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>
  ) => {
    actions.resetForm();
    actions.setSubmitting(false);
  };

  if (isLoading) return <Loader />;

  return (
    <Formik
      initialValues={emptyValues}
      onSubmit={handleSubmit}
      validationSchema={FiltersSchema}
    >
      <Form>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={brandOptions}
          placeholder="Choose a brand"
          name="brand"
          className={css.brand}
        />
      </Form>
    </Formik>
  );
}
