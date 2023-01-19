let contact = {
    name: "Adam Smith",
    street_1: "123 Fake St",
    street_2: "",
    city: "Detroit",
    state_province: "MI",
    postal_code: "12345",
    country: "United States",
    phone: "",
    url: "",
    fax: "",
    email: "asmith@example.com",
    job_title: "CEO"
}

let mockContactData = {
    "type": "contacts",
    "attributes": {
        "name": contact.name,
        "street_1": contact.street_1,
        "street_2": contact.street_2,
        "city": contact.city,
        "state_province": contact.state_province,
        "postal_code": contact.postal_code,
        "country": contact.country,
        "phone": contact.phone,
        "url": contact.url,
        "fax": contact.fax,
        "email": contact.email,
        "job_title": contact.job_title
    }
}

export default mockContactData;