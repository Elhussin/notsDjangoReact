import { toast } from 'react-toastify';

toast.success('Operation completed successfully!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});


toast.error('An error occurred while processing your request.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });


  toast.warn('Your session is about to expire!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  

  toast.info('New updates are available.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  

  toast('This is a default message.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  

//   autoClose: 5000 // التنبيه يغلق بعد 5 ثوانٍ
// autoClose: false // يبقى التنبيه حتى يُغلق يدويًا
// hideProgressBar: true  //hideProgressBar: إخفاء شريط التقدم.

// closeOnClick: يسمح بإغلاق التنبيه عند النقر عليه.
// closeOnClick: true

// pauseOnHover: يوقف عداد الإغلاق التلقائي عند مرور مؤشر الفأرة على التنبيه.
// pauseOnHover: true


//draggable: true
