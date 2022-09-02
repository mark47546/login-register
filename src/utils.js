function RegexPassword(password) {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'except'  : /[aeiou]/,
        'full'    : /^[@#][A-Za-z0-9]{7,13}$/
    };
    return re.capital.test(password) && 
           re.digit.test(password) && 
          !re.except.test(password) && 
           re.full.test(password);
}

export default RegexPassword