import React from "react";
import { useForm } from "react-hook-form";
import "./FormUserData.css";
import Btn from "../Btn/Btn";
import { useTranslation } from "react-i18next";
import CatCrew from "../../assets/cat-crew.png";

const FormUserData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-container">
      <div className="form-img">
        <img src={CatCrew} alt={t("cta_alt_cats")} />
      </div>
      <div className="form-block">
        <h2>{t("formUserData_title")}</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            {t("formUserData_label_firstName")}
            <input
              {...register("firstName", {
                required: t("formUserData_error_firstName_required"),
                minLength: {
                  value: 3,
                  message: t("formUserData_error_firstName_min"),
                },
              })}
              placeholder={t("formUserData_placeholder_firstName")}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}
          </label>
          <label>
            {t("formUserData_label_email")}
            <input
              {...register("email", {
                required: t("formUserData_error_email_required"),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t("formUserData_error_email_invalid"),
                },
              })}
              placeholder={t("formUserData_placeholder_email")}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </label>
          <label>
            {t("formUserData_label_phone")}
            <input
              {...register("phoneNumber", {
                required: t("formUserData_error_phone_required"),
                pattern: {
                  value: /^[967]\d{8}$/,
                  message: t("formUserData_error_phone_invalid"),
                },
              })}
              placeholder={t("formUserData_placeholder_phone")}
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber.message}</span>
            )}
          </label>
          <label>
            {t("formUserData_label_message")}
            <textarea
              placeholder={t("formUserData_placeholder_message")}
              {...register("message")}
            />
            {errors.message && (
              <span className="error">{errors.message.message}</span>
            )}
          </label>

          <Btn label={t("formUserData_submit")} />
        </form>
      </div>
    </div>
  );
};

export default FormUserData;
