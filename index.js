
function reversedStr(str){
    var charList = str.split("")
    var reversedList = charList.reverse("")
    var joinList = reversedList.join("")
    
    return joinList
    
    }
    
    function isPalindrome(str) {
      var reverse = reversedStr(str);
    
      return str === reverse;