import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

    constructor(private logger: LoggingService) {  
    }

     handleError(error: any): void {
        // Here you can provide whatever logging you want
      if(environment.logging.dblogging == true && localStorage.getItem('idTokenUser') !== null ){
        this.logger.error("User: " + localStorage.getItem('idTokenUser')+ error);
      }else{
        throw error;
      }
      
    }
}
