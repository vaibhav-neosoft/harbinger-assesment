export const formData = {
    fields: [
      {
        id: "name",
        label: "Full Name",
        fieldType: "text",
        placeholder: "Enter your full name",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 50
        }
      },
      {
        id: "email",
        label: "Email",
        fieldType: "email",
        placeholder: "Enter your email address",
        validation: {
          required: true,
          pattern: "^\\S+@\\S+\\.\\S+$"
        }
      },
      {
        id: "gender",
        label: "Gender",
        fieldType: "singleSelect",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" }
        ],
        validation: {
          required: true
        }
      },
      {
        id: "hobbies",
        label: "Hobbies",
        fieldType: "multiSelect",
        options: [
          { label: "Reading", value: "reading" },
          { label: "Traveling", value: "traveling" },
          { label: "Cooking", value: "cooking" },
          { label: "Sports", value: "sports" }
        ]
      },
      {
        id: "country",
        label: "Country",
        fieldType: "dropdown",
        options: [
          { label: "United States", value: "us" },
          { label: "India", value: "in" },
          { label: "Canada", value: "ca" },
          { label: "Australia", value: "au" }
        ],
        validation: {
          required: true
        }
      }
    ]
  };
  