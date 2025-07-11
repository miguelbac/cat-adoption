import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import Btn from "../Btn/Btn";

/**
 ** Just a component to get data from the user. Use useForm()
 */

const Form = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-block">
      <img src="src\assets\cat-crew.png" alt="" />
      <h2>Busca aquí a tu nuevo amigo</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Raza:
          <select {...register("breed")}>
            <option value="siamese">Siamese</option>
            <option value="maine-coon">Maine Coon</option>
            <option value="british-shorthair">British Shorthair</option>
          </select>
        </label>
        <label>
          Tamaño:
          <select {...register("size")}>
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </label>
        <label>
          Edad:
          <select {...register("age")}>
            <option value="1<"> menos de 1 año </option>
            <option value="2-4">2-4 años</option>
            <option value="4+">4 años y mas</option>
          </select>
        </label>
        <label>
          Sexo:
          <select {...register("sex")}>
            <option value="male">Chico</option>
            <option value="female">Chica</option>
          </select>
        </label>

        <Btn label="Submit" />
      </form>
    </div>
  );
};

export default Form;
