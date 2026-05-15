'use client';
import { useId } from 'react';
import css from './BookingForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { Order } from '@/types/order';

interface BookingFormProps {
  onSubmit: (order: Order) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}
const initialValues: FormValues = {
  name: '',
  email: '',
  bookingDate: null,
  comment: '',
};
const bookingValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Name should be at least 3 symbols')
    .max(100, 'Name should be maximum 100 symbols')
    .required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .trim()
    .min(3, 'Email should be at least 3 symbols')
    .max(100, 'Email should be maximum 100 symbols')
    .required('Please enter your email'),
  bookingDate: Yup.date().nullable(),
  comment: Yup.string()
    .trim()
    .min(3, 'Comment should be at least 3 symbols')
    .max(1000, 'Too much symbols'),
});
const formatDateToBackend = (date: Date | null) => {
  if (date === null) return;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
export default function BookingForm({ isPending, onSubmit }: BookingFormProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const order: Order = {
      name: values.name,
      email: values.email,
      bookingDate: values.bookingDate
        ? formatDateToBackend(values.bookingDate)
        : undefined,
      comment: values.comment,
    };

    onSubmit(order);

    actions.resetForm();
    actions.setSubmitting(false);
  };
  return (
    <div className={css.formWrapper}>
      <h4 className={css.formTitle}>Book your car now</h4>
      <p className={css.formSup}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={bookingValidationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              className={css.input}
              placeholder="Name*"
            />
            <ErrorMessage name="name" component="p" className={css.error} />
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.input}
              placeholder="Email*"
            />
            <ErrorMessage name="email" component="p" className={css.error} />
            <DatePicker
              selected={values.bookingDate}
              onChange={(bookingDate: Date | null) =>
                setFieldValue('bookingDate', bookingDate)
              }
              dateFormat="dd.MM.yyyy"
              placeholderText="Booking date"
              className={css.input}
              disabled={isPending}
              minDate={new Date()}
              name="bookingDate"
            />
            <Field
              as="textarea"
              type="text"
              name="comment"
              id={`${fieldId}-name`}
              className={css.textarea}
              placeholder="Comment"
            />
            <ErrorMessage name="comment" component="p" className={css.error} />
            <button type="submit" className={css.sendBtn}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
