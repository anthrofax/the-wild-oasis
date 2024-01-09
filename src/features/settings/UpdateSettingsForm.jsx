import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner.jsx";
import { useGetSettings } from "./useGetSetting.js";
import { useUpdateSetting } from "./useUpdateSetting.js";

function UpdateSettingsForm() {
  const {
    isFetching,
    settings: {
      breakfastPrice,
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
    } = {},
  } = useGetSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  const handleUpdateSetting = function (e) {
    const { value, defaultValue, id } = e.target;

    if (!value || !id || defaultValue === value) return;

    updateSetting({ [id]: value });
  };

  if (isFetching) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="maxGuestPerBooking"
          defaultValue={maxGuestPerBooking}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
