"use strict";

var companyInformationForPrivacyPolicy = function companyInformationForPrivacyPolicy() {
  return regeneratorRuntime.async(function companyInformationForPrivacyPolicy$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (companyDataForLogo) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(fetchCompanyInformation());

        case 3:
          document.querySelectorAll(".privacy.company-name").forEach(function (e) {
            e.textContent = companyDataForLogo.company_name;
          });
          document.querySelectorAll(".privacy.business").forEach(function (e) {
            e.textContent = companyDataForLogo.manufacture;
          });
          document.querySelectorAll(".privacy.address").forEach(function (e) {
            e.textContent = companyDataForLogo.address;
          });
          document.querySelectorAll(".privacy.email-link").forEach(function (e) {
            var contactInfo = companyDataForLogo.contact.find(function (co) {
              return co.country == country;
            });
            e.innerHTML = "<a href=\"mailto:".concat(contactInfo.email, "\">").concat(contactInfo.email, "</a>");
          });
          document.querySelectorAll(".privacy.phone-link").forEach(function (e) {
            var contactInfo = companyDataForLogo.contact.find(function (co) {
              return co.country == country;
            });
            e.innerHTML = "<a href=\"tel:".concat(contactInfo.phone, "\">").concat(contactInfo.phone, "</a>");
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

companyInformationForPrivacyPolicy();