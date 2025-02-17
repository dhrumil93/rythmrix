export const validateMemberData = (memberData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!memberData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (memberData.email && !emailRegex.test(memberData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!memberData.age) {
    errors.age = 'Age is required';
  } else if (isNaN(memberData.age) || parseInt(memberData.age) <= 0) {
    errors.age = 'Please enter a valid age';
  }

  if (!memberData.gender) {
    errors.gender = 'Gender is required';
  }

  if (!memberData.weight) {
    errors.weight = 'Weight is required';
  } else if (isNaN(memberData.weight) || parseInt(memberData.weight) <= 0) {
    errors.weight = 'Please enter a valid weight';
  }

  if (!memberData.height) {
    errors.height = 'Height is required';
  } else if (isNaN(memberData.height) || parseInt(memberData.height) <= 0) {
    errors.height = 'Please enter a valid height';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 