function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getInitials(string) {
  let initials = string.split(" ");
  initials = initials.map((word) => {
    return word.charAt(0);
  });
  return initials.join("");
}

export { capitalizeFirstLetter, getInitials };
