module.exports = {
    post_register: {
        schema: {
            "data": {
                "client": {
                    "totalbill": { 'type': 'number' },
                    "name": { 'type': 'string' },
                    "email": { 'type': 'string' },
                    "phone_number": { 'type': 'number' }
                },
                "agency": {
                    "address": {
                        "address1": { 'type': 'string' },
                        "address2": { 'type': 'string' }
                    },
                    "name": { 'type': 'string' },
                    "state": { 'type': 'string' },
                    "city": { 'type': 'string' },
                    "phone_number": { 'type': 'number' }
                }
            }
        },
        examples: {
            "data": {
                "client": {
                    "totalbill": 1000,
                    "name": "Lucifer",
                    "email": "h@h.com",
                    "phone_number": 1234567890
                },
                "agency": {
                    "address": {
                        "address1": "ABC",
                        "address2": "XYZ"
                    },
                    "name": "Harshil Kothari",
                    "state": "GUJ",
                    "city": "Surat",
                    "phone_number": 9987654321
                }
            }
        }
    },
    put_client: {
        schema: {
            "data": {
                "totalbill": { 'type': 'number' },
                "name": { 'type': 'string' },
                "email": { 'type': 'string' },
                "phone_number": { 'type': 'number' }
            }
        },
        examples: {
            "data": {
                "totalbill": 1000,
                "name": "Lucifer",
                "email": "h@h.com",
                "phone_number": 1234567890
            }
        }

    }}