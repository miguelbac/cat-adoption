import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import Btn from "../Btn/Btn";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="form-img">
        <img src="src/assets/cat-crew.png" alt={t("cta_alt_cats")} />
      </div>
      <div className="form-block">
        <h2>{t("form_title")}</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            {t("form_label_breed")}
            <select {...register("breed")}>
              <option value="siamese">{t("form_breed_siamese")}</option>
              <option value="maine-coon">{t("form_breed_maine_coon")}</option>
              <option value="british-shorthair">
                {t("form_breed_british_shorthair")}
              </option>
            </select>
          </label>
          <label>
            {t("form_label_size")}
            <select {...register("size")}>
              <option value="small">{t("form_size_small")}</option>
              <option value="medium">{t("form_size_medium")}</option>
              <option value="large">{t("form_size_large")}</option>
            </select>
          </label>
          <label>
            {t("form_label_age")}
            <select {...register("age")}>
              <option value="1<">{t("form_age_less_than_1")}</option>
              <option value="2-4">{t("form_age_2_to_4")}</option>
              <option value="4+">{t("form_age_more_than_4")}</option>
            </select>
          </label>
          <label>
            {t("form_label_sex")}
            <select {...register("sex")}>
              <option value="male">{t("form_sex_male")}</option>
              <option value="female">{t("form_sex_female")}</option>
            </select>
          </label>

          <Btn label={t("form_submit_button")} />
        </form>
      </div>
    </>
  );
};

export default Form;
