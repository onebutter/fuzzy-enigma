import libphonenumber from 'google-libphonenumber';
const PNF = libphonenumber.PhoneNumberFormat;
let phoneNumberUtil;

function actionFulfilment(services) {
  try {
    if (typeof phoneNumberUtil === 'undefined') {
      phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
    }
    return services
      .filter(v => typeof v !== 'undefined' || v !== null)
      .map(v => fulfil(v));
  } catch (e) {
    return services.filter(v => typeof v !== 'undefined' || v !== null);
  }
}

function fulfil(service) {
  try {
    if (service.action && service.action.type) {
      return addToAction(service);
    } else {
      return createAction(service);
    }
  } catch (e) {
    return service;
  }
}

function addToAction(service) {
  const { type } = service.action;
  switch (type) {
    case 'extservice':
      return {
        ...service,
        action: extService(service)
      };
    default:
      return service;
  }
}

function createAction(service) {
  const { value } = service;
  const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (regexEmail.test(value)) {
    return {
      ...service,
      action: {
        type: 'email',
        target: value
      }
    };
  }
  if (regexUrl.test(value)) {
    const target = value.startsWith('http') ? value : `http://${value}`;
    return {
      ...service,
      action: {
        type: 'url',
        target
      }
    };
  }
  try {
    const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
      value,
      service.countryCode || 'US'
    );
    if (phoneNumberUtil.isPossibleNumber(phoneNumber)) {
      return {
        ...service,
        action: {
          type: 'tel',
          target: phoneNumberUtil.format(phoneNumber, PNF.E164)
        }
      };
    } else {
      return { ...service };
    }
  } catch (e) {
    return { ...service };
  }
}

function extService(service) {
  const { vendor } = service.action;
  switch (vendor) {
    case 'github':
      return {
        ...service.action,
        type: 'url',
        target: `https://github.com/${service.value}`
      };
    default:
      return service.action;
  }
}

export default actionFulfilment;
