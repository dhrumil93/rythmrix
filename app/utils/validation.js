export const validateMemberData = (data) => {
  const errors = {};
  let isValid = true;

  if (!data.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!data.relation.trim()) {
    errors.relation = 'Relation is required';
    isValid = false;
  }

  if (!data.age.trim()) {
    errors.age = 'Age is required';
    isValid = false;
  } else if (isNaN(data.age) || data.age <= 0) {
    errors.age = 'Please enter a valid age';
    isValid = false;
  }

  if (!data.gender.trim()) {
    errors.gender = 'Gender is required';
    isValid = false;
  }

  if (!data.weight.trim()) {
    errors.weight = 'Weight is required';
    isValid = false;
  } else if (isNaN(data.weight) || data.weight <= 0) {
    errors.weight = 'Please enter a valid weight';
    isValid = false;
  }

  if (!data.height.trim()) {
    errors.height = 'Height is required';
    isValid = false;
  } else if (isNaN(data.height) || data.height <= 0) {
    errors.height = 'Please enter a valid height';
    isValid = false;
  }

  return { isValid, errors };
};