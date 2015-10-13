let Jordan = {
  add: function(num1, num2) {
    return num1 + num2; 
  },

  add2: function(num1, num2) {
    return num1 + this.add(num1, num2);
  },

  addc: function(num1, num2, cb) {
    cb(this.add(num1, num2));
  }
}

module.exports = Jordan;
