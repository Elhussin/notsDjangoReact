// pages/index.js
import DynamicForm from '../components/DynamicForm';

export default function Home() {
  const fields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'bio', label: 'Bio', type: 'textarea' },
  ];

  const handleSubmit = (formData ) => {
    console.log('Form Data Submitted:', formData);
    // يمكنك هنا إرسال البيانات إلى الخادم أو التعامل معها
  };

  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <DynamicForm fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}


// // pages/index.js
// import DynamicForm from '../components/DynamicForm';

// export default function Home() {
//   const fields = [
//     { name: 'username', label: 'Username', type: 'text' },
//     { name: 'password', label: 'Password', type: 'password' },
//     { name: 'email', label: 'Email', type: 'email' },
//     { name: 'bio', label: 'Bio', type: 'textarea' },
//     {
//       name: 'country',
//       label: 'Country',
//       type: 'select',
//       options: [
//         { value: 'us', label: 'United States' },
//         { value: 'ca', label: 'Canada' },
//         { value: 'uk', label: 'United Kingdom' },
//       ],
//     },
//     { name: 'subscribe', label: 'Subscribe to newsletter', type: 'checkbox' },
//     { name: 'birthdate', label: 'Birthdate', type: 'date' },
//   ];

//   const handleSubmit = (formData) => {
//     console.log('Form Data Submitted:', formData);
//   };

//   return (
//     <div>
//       <h1>Dynamic Form Example</h1>
//       <DynamicForm fields={fields} onSubmit={handleSubmit} />
//     </div>
//   );
// }