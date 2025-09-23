'use client';

import React, { useState, useEffect } from 'react';
import classes from './CheckoutForm.module.scss';

interface CheckoutFormProps {
  onValidationChange: (isValid: boolean) => void;
}

export function CheckoutForm({ onValidationChange }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    mobilePhone: '+38',
    email: '',
    name: '',
    surname: '',
    town: '',
    oblast: '',
    address: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({
    mobilePhone: false,
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
      if (value.length !== 13 || !value.startsWith('+38')) {
        newErrors.mobilePhone = true;
        fieldIsValid = false;
      } else {
        newErrors.mobilePhone = false;
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

    switch (name) {
      case 'mobilePhone':
        formattedValue = formatMobilePhone(value);
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

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { newErrors, fieldIsValid } = validateField(name, value);
    setErrors(newErrors);
  };

  useEffect(() => {
    const formIsValid = requiredFields.every((field) => {
      if (field === 'email') return true;
      return formData[field as keyof typeof formData].trim() !== '';
    });
    onValidationChange(formIsValid);
  }, [formData, onValidationChange]);

  const renderError = (fieldName: string) => {
    if (touched[fieldName as keyof typeof touched] && errors[fieldName as keyof typeof errors]) {
      return (
        <div className={classes.error_message}>
          <span>This field is required</span>
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
            value={formData.mobilePhone.slice(3)}
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
          value={formData.email}
          onChange={handleChange}
          placeholder="example@example.com"
        />
      </div>
      <div className={classes.form_group}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
          value={formData.surname}
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
          value={formData.town}
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
          value={formData.oblast}
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
          value={formData.address}
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
          value={formData.cardName}
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
          value={formData.cardNumber}
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
            value={formData.cardExpiry}
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
            value={formData.cardCvv}
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
