 // Get all calculator keys and display elements
 const keys = document.querySelectorAll('.key');
 const display_input = document.querySelector('.display .input');
 const display_output = document.querySelector('.display .output');

 // Initialize the input string
 let input = "";

 // Iterate through each calculator key
 for (let key of keys){
    // Get the value of the key from the 'data-key' attribute
     const value = key.dataset.key;

     // Add a click event listener for each key
     key.addEventListener('click', () => {
         // Check which key was clicked and perform the corresponding action
         if(value == "clear"){
           // Clear the input and display
             input = "";
             display_input.innerHTML = "";
             display_output.innerHTML = "";
         } else if(value == "backspace"){
            // Handle backspace by removing the last character from the input
             input = input.slice(0, -1);
             display_input.innerHTML = CleanInput(input);
         } else if(value == "="){
            // Evaluate the input expression and display the result
             let result = eval(PrepareInput(input));

             display_output.innerHTML = CleanOutput(result);
         } else if(value == "brackets"){
           // Handle brackets to add or remove parentheses
             if(
                 input.indexOf("(") == -1 || 
                 input.indexOf("(") != -1 && 
                 input.indexOf(")") != -1 && 
                 input.lastIndexOf("(") < input.lastIndexOf(")")
             ) {
                 input += "(";
             } else if (
                 input.indexOf("(") != -1 && 
                 input.indexOf(")") == -1 ||
                 input.indexOf("(") != -1 &&
                 input.indexOf(")") != -1 &&
                 input.lastIndexOf("(") > input.lastIndexOf(")")
             ) {
                 input += ")";
             }

             display_input.innerHTML = CleanInput(input);
         }   else{
              // Validate and append the value to the input
             if (ValidateInput(value)){
               input += value;
             display_input.innerHTML = CleanInput(input);
             }
         }
     })
 }

 // Function to clean and format the input
 function CleanInput(input){
   //  (Code to format and clean the input)
    let input_array = input.split('');
   let input_array_length = input_array.length;

   for (let i = 0; i < input_array_length; i++){
       if(input_array[i] == "*"){
            input_array[i] = ' <span class="operator">x</span> ';
          } 
          else if (input_array[i] == "/"){
            input_array[i] = ' <span class="operator">÷</span> ';
          } 
          else if (input_array[i] == "+"){
            input_array[i] = ' <span class="operator">+</span> ';
          } 
          else if (input_array[i] == "-"){
            input_array[i] = ' <span class="operator">-</span> ';
          } 
          else if (input_array[i] == "("){
            input_array[i] = '<span class="brackets">(</span>';
          } 
          else if (input_array[i] == ")"){
            input_array[i] = '<span class="brackets">)</span>';
          } 
          else if (input_array[i] == "%"){
            input_array[i] = '<span class="percent">%</span>';
          }
      }

   return input_array.join("");
  }


  // Function to clean and format the output
  function CleanOutput (output){
      // (Code to format and clean the output)
      let output_string = output.toString();
      let decimal = output_string.split(".")[1];
      output_string = output_string.split(".")[0];

      let output_array = output_string.split("");

      if (output_array.length > 3){
          for (let i = output_array.length - 3; i > 0; i -= 3){
              output_array.splice(i, 0, ",");
          }
      }

      if (decimal){
          output_array.push(".");
          output_array.push(decimal);
      }

      return output_array.join("");
  }

  // Function to validate input
  function ValidateInput(value){
      // ... (Code to validate the input)
      let last_input = input.slice(-1);
      let operators = ["+", "-", "*", "/"];

      if (value == "." && last_input == "."){
          return false;
      }

      if (operators.includes(value)){
          if(operators.includes(last_input)){
              return false;
          } else {
              return true;
          }
      }

      return true;
  }

  // Function to prepare input for evaluation
  function PrepareInput(input){
      // ... (Code to prepare the input for evaluation)
      let input_array = input.split("");

      for (let i = 0; i < input_array.length; i++){
          if(input_array[i] == "%"){
              input_array[i] == "/100";
          }
      }

      return input_array.join("")
  }

  // Add an event listener for keyboard input
  document.addEventListener('keydown', handleKeyboardInput);

  // Function to handle keyboard input
function handleKeyboardInput(event) {
   // Get the pressed key from the event
   const key = event.key;

   // Initialize a variable to store the corresponding calculator value
   let value = '';

   // Map keyboard keys to calculator values
   switch (key) {
       case 'Enter':
           // When Enter key is pressed, it's mapped to the '=' key in the calculator
           value = '=';
        break;

        case 'Backspace':
           // Backspace key is mapped to the 'backspace' key in the calculator
           value = 'backspace';
        break;

       case 'Escape':
            // Escape key is mapped to the 'clear' key in the calculator
            value = 'clear';
         break;
        case '+':
            // The plus key on the keyboard is mapped to the '+' key in the calculator
           value = '+';
         break;

        case '-':
           // The minus key on the keyboard is mapped to the '-' key in the calculator
            value = '-';
        break;

        case '*':
            // The asterisk key (*) on the keyboard is mapped to the '*' key in the calculator
           value = '*';
        break;

        case '/':
           // The forward slash key (/) on the keyboard is mapped to the '/' key in the calculator
            value = '/';
         break;

        case '.':
             // The period key (.) on the keyboard is mapped to the '.' key in the calculator
           value = '.';
          break;

         case '0': // Numeric keys 0-9
         case '1':
         case '2':
         case '3':
         case '4':
         case '5':
         case '6':
         case '7':
         case '8':
          case '9':
             value = key; // Map numeric keys directly
         break;

       case '(': // Open bracket
            // Map '(' key to 'brackets' to match your calculator's button data-key
           value = 'brackets';
       break;

       case ')': // Close bracket
            // Map ')' key to 'brackets' to match your calculator's button data-key
            value = 'brackets';
        break;

    default:
       // Handle unknown keys (you can add more cases if needed)
      break;
}

// Find the corresponding key element in the calculator's HTML using the 'data-key' attribute
const keyElement = document.querySelector(`[data-key="${value}"]`);

// If a corresponding key element is found, simulate a click event on it
if (keyElement) {
  keyElement.click();
}
}