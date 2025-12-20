let companyInformationForPrivacyPolicy = async () => {
    if(!companyDataForLogo)
        await fetchCompanyInformation();

    document.querySelectorAll(".privacy.company-name").forEach(e =>{
        e.textContent = companyDataForLogo.company_name;

    });

    document.querySelectorAll(".privacy.business").forEach(e =>{
        e.textContent = companyDataForLogo.manufacture;
    });

    document.querySelectorAll(".privacy.address").forEach(e =>{
        e.textContent = companyDataForLogo.address;
    });

    document.querySelectorAll(".privacy.email-link").forEach(e => {
        let contactInfo = companyDataForLogo.contact.find(co => co.country == country);

        e.innerHTML = `<a href="mailto:${contactInfo.email}">${contactInfo.email}</a>`
    });

    document.querySelectorAll(".privacy.phone-link").forEach(e => {
        let contactInfo = companyDataForLogo.contact.find(co => co.country == country);

        e.innerHTML = `<a href="tel:${contactInfo.phone}">${contactInfo.phone}</a>`
    })
}

companyInformationForPrivacyPolicy();