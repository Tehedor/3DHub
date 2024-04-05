import { Form as BootstrapForm, Button as BootstrapButton} from 'react-bootstrap';
import { form, control, button } from 'react-validation';

// Define own Form component
const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
);
 
// Define own Input component
const Input = ({ error, isChanged, isUsed,formlabel, ...props }) => (
  <div>
    <BootstrapForm.Group>
      {formlabel ?
        <BootstrapForm.Label>{formlabel}</BootstrapForm.Label>
        : null
      }
      <BootstrapForm.Control  {...props}/>
      {isChanged && isUsed && error}
    </BootstrapForm.Group>
  </div>
);
// // Define own Input component
// const Input = ({ error, isChanged, isUsed, ...props }) => (
//   <div>
//     <input {...props} />
//     {isChanged && isUsed && error}
//   </div>
// );
 
// Define own Button component
const Button = ({ hasErrors, ...props }) => {
  return (
    <BootstrapButton {...props}  />
    // <BootstrapButton {...props} disabled={hasErrors} />
    // <button {...props} disabled={hasErrors} />
  );
};
 
// Now call HOCs on components
export const MyValidationForm = form(Form);
export const MyValidationInput = control(Input);
export const MyValidationButton = button(Button);


//////////////////////////////////// Base ////////////////////////////////////
// import { form, control, button } from 'react-validation';
 
// // Define own Form component
// const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
//   <form {...props}>{children}</form>
// );
 
// // Define own Input component
// const Input = ({ error, isChanged, isUsed, ...props }) => (
//   <div>
//     <input {...props} />
//     {isChanged && isUsed && error}
//   </div>
// );
 
// // Define own Button component
// const Button = ({ hasErrors, ...props }) => {
//   return (
//     <button {...props} disabled={hasErrors} />
//   );
// };
 
// // Now call HOCs on components
// const MyValidationForm = form(Form);
// const MyValidationInput = control(Input);
// const MyValidationButton = button(Button);