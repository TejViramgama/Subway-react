import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import "./validationForm.css";
import Invoice from "../Invoice/Invoice";

const ValidationForm = (props) => {
  const [dataEntered, setDataEntered] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(errors);
    setDataEntered(data);
    setIsSubmited(true);
  };

  const changeIsSubmitedStatus = () => {
    setIsSubmited(!isSubmited);
  }

  return (
    <Fragment>
      {!isSubmited && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Employ Name</label>
          <input type="text" placeholder="Name" {...register("username", { required: "username is required" })} aria-invalid={errors.username ? "true" : "false"} />
          {errors.username && <p role="alert">{errors.username?.message}</p>}

          <label htmlFor="checkNumber">Check number</label>
          <input type="text" placeholder="Check #1234" {...register("checkNumber", { required: "Check number is required" })} />
          {errors.checkNumber && <p role="alert">{errors.checkNumber?.message}</p>}

          <div className="calHrs">
          <label htmlFor="workingHrs">Normal Working</label>
            <input  type="number" step="any" placeholder="Working HRS" label="workin HRS" {...register("workingHrs")} />
            <input type="number" step="any" placeholder="Per Hr Rate" {...register("perHrRate")} />
          </div>

          <div className="calHrs">
          <label htmlFor="workingOTHrs">OverTime Working</label>
            {/* <label htmlFor="workingOTHrs">Working OT Hrs</label> */}
            <input type="number" step="any" placeholder="Working OT HRS" {...register("workingOTHrs")} />
            <input type="number" step="any" placeholder="Per Hr OT Rate" {...register("perHrOTRate")} />
          </div>

          <label htmlFor="tip">Tip</label>
          <input type="number" step="any" placeholder="" {...register("tip")} />

          <label htmlFor="tip">Fedral With Holding</label>
          <input type="number" step="any" placeholder="" {...register("fredWH")} />
          <input type="submit" />
        </form>
      )}

      {isSubmited && (
        <Invoice
          username={dataEntered.username}
          checkNo={dataEntered.checkNumber}
          workingHrs={dataEntered.workingHrs}
          perHrRate={dataEntered.perHrRate}
          workingOTHrs={dataEntered.workingOTHrs}
          perHrOTRate={dataEntered.perHrOTRate}
          tip={dataEntered.tip}
          fredWH={dataEntered.fredWH}
          changeIsSubmited = {changeIsSubmitedStatus}
        />
      )}
    </Fragment>
  );
};

export default ValidationForm;
