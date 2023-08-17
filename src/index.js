import { 
  sendPV, 
  registerBeforeCreateParams, 
  registerBeforeUpload, 
  registerAfterUpload, 
  registerOnError
} from './collect';
import { upload } from './upload';

window.__monitor = {
  sendPV,
  registerBeforeCreateParams, 
  registerBeforeUpload, 
  registerAfterUpload, 
  registerOnError,
  upload,
};
