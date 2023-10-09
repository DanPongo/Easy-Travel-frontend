import { ReportHandler } from 'web-vitals';

// Function to report the web vitals metrics.
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  
  // Check if the callback is provided and it's a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    
    // Dynamically import web vitals functions to capture performance metrics.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      
      // Capture and report Cumulative Layout Shift metric.
      getCLS(onPerfEntry);
      
      // Capture and report First Input Delay metric.
      getFID(onPerfEntry);
      
      // Capture and report First Contentful Paint metric.
      getFCP(onPerfEntry);
      
      // Capture and report Largest Contentful Paint metric.
      getLCP(onPerfEntry);
      
      // Capture and report Time to First Byte metric.
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
