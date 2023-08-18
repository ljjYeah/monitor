import { 
  sendPV, 
  registerBeforeCreateParams, 
  registerBeforeUpload, 
  registerAfterUpload, 
  registerOnError
} from './collect';
import { upload } from './upload';

const appearEvent = new CustomEvent('onAppear');
const disappearEvent = new CustomEvent('onDisappear');
const ob = new window.IntersectionObserver(function(entries){
  entries.forEach(item=>{
    if (item.target.intersectionRatio > 0) {
      console.log('显示了');
      item.target.dispatchEvent(appearEvent);
    } else {
      console.log('消失了');
      item.target.dispatchEvent(disappearEvent);
    }
  })
});
const appearDom = document.querySelectorAll('[appear]');
appearDom.forEach(item => {
  ob.observe(item);
})

window.__monitor = {
  sendPV,
  registerBeforeCreateParams, 
  registerBeforeUpload, 
  registerAfterUpload, 
  registerOnError,
  upload,
};
