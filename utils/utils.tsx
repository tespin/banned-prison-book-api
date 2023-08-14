const getFiltered = (data, input) => {
  if (input.length < 1) return [];
  else return data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
}

export { getFiltered };