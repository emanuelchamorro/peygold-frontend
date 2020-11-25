// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  social_networks: {
    twitter : '#',
    facebook : '#',
    linkedin : '#',
    instagram : '#',
  },
  form: {
    url: {
      validations : {
        pattern: '^(https?|http):\\/\\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2,10}))(:[0-9]+)*(\\/($|[a-zA-Z0-9.,?\'\\\\+&%$#=~_-]+))*$'
      }
    },
    password: {
      validations: {
        pattern: '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&.+=]).*$',
      }
    },
    number: {
      validations: { 
        pattern: '^[0-9]*$',
      }
    }
  },
  interceptors: {
    jwt_interceptor: {
      white_list: [
        'api.peygold.com',
        'mensajeropush.herokuapp.com'
      ]
    }
  },
  api: {
    url: 'https://api.peygold.com/api',
    avatarUrl: 'https://api.peygold.com'
  },
  api_notification: {
    url: 'https://mensajeropush.herokuapp.com'
  },
  localStorage: {
    user_var_name: 'pey_user',
    user_id_var_name: 'uid',
    access_token_var_name: 'pey_access_token',
    access_token_temp_var_name: 'att'
  },
  mercado_pago: {
    publishable_key: 'TEST-283b2fb8-75f1-49ef-bab7-7918c9ae5d09'
  },
  i18n: {
    language: 'es',
    country: 'es_AR',
  },
  paginator: {
    per_page: 10,
  },
  locations: {
    default: {
      id: '4',
      label:	'Argentina',
    }
  },
  google_map_key: 'AIzaSyCg7znlGohP4P3AlvKrLL73N7Dz7L7UTDQ', 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
