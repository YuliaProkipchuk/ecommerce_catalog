'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/stores';
import { setFormField } from '@/app/stores/slices/checkoutFormSlice';
import classes from './CheckoutForm.module.scss';

interface CheckoutFormProps {
  onValidationChange: (isValid: boolean) => void;
}

export function CheckoutForm({ onValidationChange }: CheckoutFormProps) {
  const dispatch: AppDispatch = useDispatch();
  const checkoutFormData = useSelector((state: RootState) => state.checkoutForm);

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({
    mobilePhone: false,
    email: false,
    name: false,
    surname: false,
    town: false,
    oblast: false,
    address: false,
    cardName: false,
    cardNumber: false,
    cardExpiry: false,
    cardCvv: false,
  });

  const [touched, setTouched] = useState({
    mobilePhone: false,
    email: false,
    name: false,
    surname: false,
    town: false,
    oblast: false,
    address: false,
    cardName: false,
    cardNumber: false,
    cardExpiry: false,
    cardCvv: false,
  });

  const requiredFields = [
    'mobilePhone',
    'name',
    'surname',
    'town',
    'oblast',
    'address',
    'cardName',
    'cardNumber',
    'cardExpiry',
    'cardCvv',
  ];

  const nonPaymentFields = [
    'mobilePhone',
    'email',
    'name',
    'surname',
    'town',
    'oblast',
    'address',
  ];

  const formatMobilePhone = (digits: string) => {
    return '+38' + digits.replace(/\D/g, '').slice(0, 10);
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const limitedDigits = digits.slice(0, 16);
    return limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatCardExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const limitedDigits = digits.slice(0, 4);
    if (limitedDigits.length >= 2) {
      return limitedDigits.slice(0, 2) + '/' + limitedDigits.slice(2);
    }
    return limitedDigits;
  };

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 3);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    let fieldIsValid = true;

    if (name === 'mobilePhone') {
      const fullPhoneNumber = checkoutFormData.mobilePhone;
      if (fullPhoneNumber.length !== 13 || !fullPhoneNumber.startsWith('+38')) {
        newErrors.mobilePhone = true;
        fieldIsValid = false;
      } else {
        newErrors.mobilePhone = false;
      }
    } else if (['name', 'surname', 'town', 'oblast', 'cardName'].includes(name)) {
      if (value.trim().length < 3 || /\d/.test(value)) {
        newErrors[name as keyof typeof errors] = true;
        fieldIsValid = false;
      } else {
        newErrors[name as keyof typeof errors] = false;
      }
    } else if (name === 'address') {
      if (value.trim().length < 3) {
        newErrors.address = true;
        fieldIsValid = false;
      } else {
        newErrors.address = false;
      }
    } else if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '');
      if (digits.length !== 16) {
        newErrors.cardNumber = true;
        fieldIsValid = false;
      } else {
        newErrors.cardNumber = false;
      }
    } else if (name === 'cardExpiry') {
      const digits = value.replace(/\D/g, '');
      const month = parseInt(digits.slice(0, 2), 10);
      if (digits.length !== 4 || month < 1 || month > 12) {
        newErrors.cardExpiry = true;
        fieldIsValid = false;
      } else {
        newErrors.cardExpiry = false;
      }
    } else if (name === 'cardCvv') {
      const digits = value.replace(/\D/g, '');
      if (digits.length !== 3) {
        newErrors.cardCvv = true;
        fieldIsValid = false;
      } else {
        newErrors.cardCvv = false;
      }
    } else if (name !== 'email' && value.trim() === '') {
      newErrors[name as keyof typeof errors] = true;
      fieldIsValid = false;
    } else {
      newErrors[name as keyof typeof errors] = false;
    }
    return { newErrors, fieldIsValid };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (nonPaymentFields.includes(name)) {
      switch (name) {
        case 'mobilePhone':
          formattedValue = formatMobilePhone(value);
          break;
        case 'name':
        case 'surname':
        case 'town':
        case 'oblast':
          formattedValue = value.replace(/\d/g, '');
          break;
        default:
          formattedValue = value;
      }
      dispatch(setFormField({ field: name as keyof typeof checkoutFormData, value: formattedValue }));
    } else {
      switch (name) {
        case 'cardName':
          formattedValue = value.replace(/\d/g, '');
          break;
        case 'cardNumber':
          formattedValue = formatCardNumber(value);
          break;
        case 'cardExpiry':
          formattedValue = formatCardExpiry(value);
          break;
        case 'cardCvv':
          formattedValue = formatCVV(value);
          break;
        default:
          formattedValue = value;
      }
      setPaymentData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationValue = name === 'mobilePhone' ? checkoutFormData.mobilePhone : value;
    const { newErrors } = validateField(name, validationValue);
    setErrors(newErrors);
  };

  useEffect(() => {
    const allFormData = { ...checkoutFormData, ...paymentData };
    const formIsValid = requiredFields.every((field) => {
      if (field === 'email') return true;
      const value = allFormData[field as keyof typeof allFormData].trim();
      if (['name', 'surname', 'town', 'oblast', 'cardName'].includes(field)) {
        return value.length >= 3 && !/\d/.test(value);
      }
      if (field === 'address') {
        return value.length >= 3;
      }
      if (field === 'cardNumber') {
        return value.replace(/\D/g, '').length === 16;
      }
      if (field === 'cardExpiry') {
        const digits = value.replace(/\D/g, '');
        const month = parseInt(digits.slice(0, 2), 10);
        return digits.length === 4 && month >= 1 && month <= 12;
      }
      if (field === 'cardCvv') {
        return value.replace(/\D/g, '').length === 3;
      }
      return value !== '';
    });
    onValidationChange(formIsValid);
  }, [checkoutFormData, paymentData, onValidationChange]);

  const renderError = (fieldName: string) => {
    if (touched[fieldName as keyof typeof touched] && errors[fieldName as keyof typeof errors]) {
      return (
        <div className={classes.error_message}>
          <span>
            {['name', 'surname', 'town', 'oblast', 'cardName'].includes(fieldName)
              ? 'This field requires at least 3 characters'
              : fieldName === 'address'
              ? 'This field requires at least 3 characters'
              : fieldName === 'cardNumber'
              ? 'Card number must be 16 digits'
              : fieldName === 'cardExpiry'
              ? 'Expiry must be 4 digits with a valid month (01-12)'
              : fieldName === 'cardCvv'
              ? 'CVV must be 3 digits'
              : 'This field is required'}
          </span>
        </div>
      );
    }
    return null;
  };

  const getInputClass = (fieldName: string) => {
    return touched[fieldName as keyof typeof touched] && errors[fieldName as keyof typeof errors]
      ? classes.input_error
      : '';
  };

  return (
    <form className={classes.form}>
      <div className={classes.form_group}>
        <label htmlFor="mobilePhone">Mobile Phone</label>
        <div className={`${classes.phone_group} ${getInputClass('mobilePhone')}`}>
          <span className={classes.prefix}>+38</span>
          <input
            type="tel"
            id="mobilePhone"
            name="mobilePhone"
            value={checkoutFormData.mobilePhone.slice(3)}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0XXXXXXXXX"
            maxLength={10}
          />
        </div>
        {renderError('mobilePhone')}
      </div>
      <div className={classes.form_group}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={checkoutFormData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="example@example.com"
        />
      </div>
      <div className={classes.form_group}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={checkoutFormData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('name')}
          placeholder="First Name"
        />
        {renderError('name')}
      </div>
      <div className={classes.form_group}>
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={checkoutFormData.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('surname')}
          placeholder="Last Name"
        />
        {renderError('surname')}
      </div>
      <div className={classes.form_group}>
        <label htmlFor="town">Town</label>
        <input
          type="text"
          id="town"
          name="town"
          value={checkoutFormData.town}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('town')}
          placeholder="City"
        />
        {renderError('town')}
      </div>
      <div className={classes.form_group}>
        <label htmlFor="oblast">Oblast</label>
        <input
          type="text"
          id="oblast"
          name="oblast"
          value={checkoutFormData.oblast}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('oblast')}
          placeholder="Region"
        />
        {renderError('oblast')}
      </div>
      <div className={classes.form_group}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={checkoutFormData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('address')}
          placeholder="Street, Apartment, etc."
        />
        {renderError('address')}
      </div>

      <h2 className={classes.payment_title}>Payment Method</h2>
      <div className={classes.form_group}>
        <label htmlFor="cardName">Name on Card</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={paymentData.cardName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('cardName')}
          placeholder="First & Last Name"
        />
        {renderError('cardName')}
      </div>
      <div className={classes.form_group}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('cardNumber')}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
        />
        {renderError('cardNumber')}
      </div>
      <div className={classes.form_group_row}>
        <div className={classes.form_group}>
          <label htmlFor="cardExpiry">Expiry</label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={paymentData.cardExpiry}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('cardExpiry')}
            placeholder="MM/YY"
            maxLength={5}
          />
          {renderError('cardExpiry')}
        </div>
        <div className={classes.form_group}>
          <label htmlFor="cardCvv">CVV</label>
          <input
            type="text"
            id="cardCvv"
            name="cardCvv"
            value={paymentData.cardCvv}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('cardCvv')}
            placeholder="CVV"
            maxLength={3}
          />
          {renderError('cardCvv')}
        </div>
      </div>
    </form>
  );
}