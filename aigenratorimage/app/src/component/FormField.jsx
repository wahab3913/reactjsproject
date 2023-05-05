/* eslint-disable react/prop-types */
const FormField = ({
  lableName,
  name,
  type,
  placeholder,
  handleChange,
  value,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 mg-2">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-grey-900"
          >
            {lableName}
          </label>
          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="font-semibold text-xs bg-[#ECECF1]  py-1 px-2 rounded-[5px] text-black"
            >
              Surprise me
            </button>
          )}
        </div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default FormField;
