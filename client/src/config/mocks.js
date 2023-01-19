const mockWeb3RenewablesIndex = {
  "metadata": {
    "title": "Web3 Renewables Granular Certificate Index",
    "description": "Index describing the location of all GCs reporting into the Web3 Renewables Index",
    "document_type": "Production",
    "web3_renewables_did": "did:ethr:ewc:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5",
    "version": 1
  },
  "pvSystems": {
    "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc": ["2022-08-30T00:00:00.000Z", "2022-08-31T00:00:00.000Z", "2022-09-01T00:00:00.000Z", "2022-09-02T00:00:00.000Z"],
  },
  "daily": {
    "2022-08-30T00:00:00.000Z": [
      {
        "cid": "cid",
        "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
        "fileName": "2022-08-30T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
        "certificateStatus": "Active"
      },
    ],
    "2022-08-31T00:00:00.000Z": [
      {
        "cid": "cid1",
        "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
        "fileName": "2022-08-31T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
        "certificateStatus": "Active"
      },
    ],
    "2022-09-01T00:00:00.000Z": [
      {
        "cid": "cid2",
        "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
        "fileName": "2022-09-01T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
        "certificateStatus": "Active"
      },
    ],
    "2022-09-02T00:00:00.000Z": [
      {
        "cid": "cid3",
        "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
        "fileName": "2022-09-02T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
        "certificateStatus": "Active"
      },
    ]
  },
  "monthly": {}
}

const mockDailyGCs = [
  {
    gc: {
      "energy_carrier": "Electricity",
      "timezone": "America/Chicago",
      "commissioning_date": "2022-08-17",
      "production_interval_start": "2022-08-29T05:00:00.000Z",
      "production_interval_end": "2022-08-30T04:59:59.999Z",
      "issuance_stamp_date": "2022-08-30T16:48:00.460Z",
      "source": "Solar Power",
      "technology": "Solar PV System",
      "production_device_identifier": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
      "country": "United States of America",
      "gps": {
        "latitude": "83.2",
        "longitude": "-43.2"
      },
      "ac_capacity": "100.2",
      "dc_capacity": "293.2",
      "wh_generation": {
        "timeUnit": "HOUR",
        "unit": "Wh",
        "measuredBy": "INVERTER",
        "values": [
          {
            "date": "2022-08-29 00:00:00",
            "value": null
          },
          {
            "date": "2022-08-29 01:00:00",
            "value": null
          },
          {
            "date": "2022-08-29 02:00:00",
            "value": null
          },
          {
            "date": "2022-08-29 03:00:00",
            "value": 0
          },
          {
            "date": "2022-08-29 04:00:00",
            "value": null
          },
          {
            "date": "2022-08-29 05:00:00",
            "value": null
          },
          {
            "date": "2022-08-29 06:00:00",
            "value": 0
          },
          {
            "date": "2022-08-29 07:00:00",
            "value": 300
          },
          {
            "date": "2022-08-29 08:00:00",
            "value": 200
          },
          {
            "date": "2022-08-29 09:00:00",
            "value": 878
          },
          {
            "date": "2022-08-29 10:00:00",
            "value": 1186
          },
          {
            "date": "2022-08-29 11:00:00",
            "value": 200
          },
          {
            "date": "2022-08-29 12:00:00",
            "value": 4021
          },
          {
            "date": "2022-08-29 13:00:00",
            "value": 9000
          },
          {
            "date": "2022-08-29 14:00:00",
            "value": 7923
          },
          {
            "date": "2022-08-29 15:00:00",
            "value": 300
          },
          {
            "date": "2022-08-29 16:00:00",
            "value": 2022
          },
          {
            "date": "2022-08-29 17:00:00",
            "value": 1022
          },
          {
            "date": "2022-08-29 18:00:00",
            "value": 500
          },
          {
            "date": "2022-08-29 19:00:00",
            "value": 120
          },
          {
            "date": "2022-08-29 20:00:00",
            "value": 0
          },
          {
            "date": "2022-08-29 21:00:00",
            "value": null
          },
          {
            "date": "2022-08-29 22:00:00",
            "value": 0
          },
          {
            "date": "2022-08-29 23:00:00",
            "value": null
          }
        ]
      },
      "emissions_avoidance": {
        "timeUnit": "HOUR",
        "unit": "Wh",
        "measuredBy": "INVERTER",
        "values": [
          {
            "timestamp": "2022-08-29T05:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T06:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T07:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T08:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T09:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T10:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T11:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-29T12:00:00.000Z",
            "energy": 126,
            "emissionsAvoided": 0.20112750000000001
          },
          {
            "timestamp": "2022-08-29T13:00:00.000Z",
            "energy": 601,
            "emissionsAvoided": 0.9582444166666667
          },
          {
            "timestamp": "2022-08-29T14:00:00.000Z",
            "energy": 878,
            "emissionsAvoided": 1.3759723333333334
          },
          {
            "timestamp": "2022-08-29T15:00:00.000Z",
            "energy": 1186,
            "emissionsAvoided": 1.878624
          },
          {
            "timestamp": "2022-08-29T16:00:00.000Z",
            "energy": 2463,
            "emissionsAvoided": 3.841459
          },
          {
            "timestamp": "2022-08-29T17:00:00.000Z",
            "energy": 3513,
            "emissionsAvoided": 5.660614
          },
          {
            "timestamp": "2022-08-29T18:00:00.000Z",
            "energy": 6530,
            "emissionsAvoided": 10.738585
          },
          {
            "timestamp": "2022-08-29T19:00:00.000Z",
            "energy": 6649,
            "emissionsAvoided": 10.944253999999999
          },
          {
            "timestamp": "2022-08-29T20:00:00.000Z",
            "energy": 4928,
            "emissionsAvoided": 8.136128000000001
          },
          {
            "timestamp": "2022-08-29T21:00:00.000Z",
            "energy": 4037,
            "emissionsAvoided": 6.596457999999999
          },
          {
            "timestamp": "2022-08-29T22:00:00.000Z",
            "energy": 2908,
            "emissionsAvoided": 4.618388666666667
          },
          {
            "timestamp": "2022-08-29T23:00:00.000Z",
            "energy": 780,
            "emissionsAvoided": 1.264055
          },
          {
            "timestamp": "2022-08-30T00:00:00.000Z",
            "energy": 124,
            "emissionsAvoided": 0.20402133333333333
          },
          {
            "timestamp": "2022-08-30T01:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T02:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T03:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T04:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          }
        ]
      },
      "marginal_grid_emissions_source": "https://api2.watttime.org/v2",
      "issued_from": "Development",
      "certificate_status": "Active",
      "impact_credit": "",
      "interconnection": {
        "energy_injected_utility": "Sample",
        "balancing_authority": ""
      }
    },
    date: "2022-08-29T00:00:00.000Z",
    fileName: "2022-08-29T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json"
  },
  {
    gc: {
      "energy_carrier": "Electricity",
      "timezone": "America/Chicago",
      "commissioning_date": "2022-08-17",
      "production_interval_start": "2022-08-30T05:00:00.000Z",
      "production_interval_end": "2022-08-31T04:59:59.999Z",
      "issuance_stamp_date": "2022-08-30T16:48:00.460Z",
      "source": "Solar Power",
      "technology": "Solar PV System",
      "production_device_identifier": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
      "country": "United States of America",
      "gps": {
        "latitude": "83.2",
        "longitude": "-43.2"
      },
      "ac_capacity": "100.2",
      "dc_capacity": "293.2",
      "wh_generation": {
        "timeUnit": "HOUR",
        "unit": "Wh",
        "measuredBy": "INVERTER",
        "values": [
          {
            "date": "2022-08-30 00:00:00",
            "value": null
          },
          {
            "date": "2022-08-30 01:00:00",
            "value": null
          },
          {
            "date": "2022-08-30 02:00:00",
            "value": null
          },
          {
            "date": "2022-08-30 03:00:00",
            "value": 0
          },
          {
            "date": "2022-08-30 04:00:00",
            "value": null
          },
          {
            "date": "2022-08-30 05:00:00",
            "value": null
          },
          {
            "date": "2022-08-30 06:00:00",
            "value": 0
          },
          {
            "date": "2022-08-30 07:00:00",
            "value": 100
          },
          {
            "date": "2022-08-30 08:00:00",
            "value": 502
          },
          {
            "date": "2022-08-30 09:00:00",
            "value": 203
          },
          {
            "date": "2022-08-30 10:00:00",
            "value": 2032
          },
          {
            "date": "2022-08-30 11:00:00",
            "value": 2300
          },
          {
            "date": "2022-08-30 12:00:00",
            "value": 4022
          },
          {
            "date": "2022-08-30 13:00:00",
            "value": 6302
          },
          {
            "date": "2022-08-30 14:00:00",
            "value": 9203
          },
          {
            "date": "2022-08-30 15:00:00",
            "value": 3021
          },
          {
            "date": "2022-08-30 16:00:00",
            "value": 3000
          },
          {
            "date": "2022-08-30 17:00:00",
            "value": 1500
          },
          {
            "date": "2022-08-30 18:00:00",
            "value": 500
          },
          {
            "date": "2022-08-30 19:00:00",
            "value": 0
          },
          {
            "date": "2022-08-30 20:00:00",
            "value": 0
          },
          {
            "date": "2022-08-30 21:00:00",
            "value": null
          },
          {
            "date": "2022-08-30 22:00:00",
            "value": 0
          },
          {
            "date": "2022-08-30 23:00:00",
            "value": null
          }
        ]
      },
      "emissions_avoidance": {
        "timeUnit": "HOUR",
        "unit": "Wh",
        "measuredBy": "INVERTER",
        "values": [
          {
            "timestamp": "2022-08-30T05:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T06:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T07:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T08:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T09:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T10:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T11:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-30T12:00:00.000Z",
            "energy": 126,
            "emissionsAvoided": 0.20112750000000001
          },
          {
            "timestamp": "2022-08-30T13:00:00.000Z",
            "energy": 601,
            "emissionsAvoided": 0.9582444166666667
          },
          {
            "timestamp": "2022-08-30T14:00:00.000Z",
            "energy": 878,
            "emissionsAvoided": 1.3759723333333334
          },
          {
            "timestamp": "2022-08-30T15:00:00.000Z",
            "energy": 1186,
            "emissionsAvoided": 1.878624
          },
          {
            "timestamp": "2022-08-30T16:00:00.000Z",
            "energy": 2463,
            "emissionsAvoided": 3.841459
          },
          {
            "timestamp": "2022-08-30T17:00:00.000Z",
            "energy": 3513,
            "emissionsAvoided": 5.660614
          },
          {
            "timestamp": "2022-08-30T18:00:00.000Z",
            "energy": 6530,
            "emissionsAvoided": 10.738585
          },
          {
            "timestamp": "2022-08-30T19:00:00.000Z",
            "energy": 6649,
            "emissionsAvoided": 10.944253999999999
          },
          {
            "timestamp": "2022-08-30T20:00:00.000Z",
            "energy": 4928,
            "emissionsAvoided": 8.136128000000001
          },
          {
            "timestamp": "2022-08-30T21:00:00.000Z",
            "energy": 4037,
            "emissionsAvoided": 6.596457999999999
          },
          {
            "timestamp": "2022-08-30T22:00:00.000Z",
            "energy": 2908,
            "emissionsAvoided": 4.618388666666667
          },
          {
            "timestamp": "2022-08-30T23:00:00.000Z",
            "energy": 780,
            "emissionsAvoided": 1.264055
          },
          {
            "timestamp": "2022-08-31T00:00:00.000Z",
            "energy": 124,
            "emissionsAvoided": 0.20402133333333333
          },
          {
            "timestamp": "2022-08-31T01:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T02:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T03:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T04:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          }
        ]
      },
      "marginal_grid_emissions_source": "https://api2.watttime.org/v2",
      "issued_from": "Development",
      "certificate_status": "Active",
      "impact_credit": "",
      "interconnection": {
        "energy_injected_utility": "Sample",
        "balancing_authority": ""
      }
    },
    date: "2022-08-30T00:00:00.000Z",
    fileName: "2022-08-30T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json"
  },
  {
    gc: {
      "energy_carrier": "Electricity",
      "timezone": "America/Chicago",
      "commissioning_date": "2022-08-17",
      "production_interval_start": "2022-08-31T05:00:00.000Z",
      "production_interval_end": "2022-09-01T04:59:59.999Z",
      "issuance_stamp_date": "2022-08-30T16:48:00.460Z",
      "source": "Solar Power",
      "technology": "Solar PV System",
      "production_device_identifier": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
      "country": "United States of America",
      "gps": {
        "latitude": "83.2",
        "longitude": "-43.2"
      },
      "ac_capacity": "100.2",
      "dc_capacity": "293.2",
      "wh_generation": {
        "timeUnit": "HOUR",
        "unit": "Wh",
        "measuredBy": "INVERTER",
        "values": [
          {
            "date": "2022-08-31 00:00:00",
            "value": null
          },
          {
            "date": "2022-08-31 01:00:00",
            "value": null
          },
          {
            "date": "2022-08-31 02:00:00",
            "value": null
          },
          {
            "date": "2022-08-31 03:00:00",
            "value": 0
          },
          {
            "date": "2022-08-31 04:00:00",
            "value": null
          },
          {
            "date": "2022-08-31 05:00:00",
            "value": null
          },
          {
            "date": "2022-08-31 06:00:00",
            "value": 0
          },
          {
            "date": "2022-08-31 07:00:00",
            "value": 126
          },
          {
            "date": "2022-08-31 08:00:00",
            "value": 601
          },
          {
            "date": "2022-08-31 09:00:00",
            "value": 878
          },
          {
            "date": "2022-08-31 10:00:00",
            "value": 1186
          },
          {
            "date": "2022-08-31 11:00:00",
            "value": 2463
          },
          {
            "date": "2022-08-31 12:00:00",
            "value": 3513
          },
          {
            "date": "2022-08-31 13:00:00",
            "value": 6530
          },
          {
            "date": "2022-08-31 14:00:00",
            "value": 6649
          },
          {
            "date": "2022-08-31 15:00:00",
            "value": 4928
          },
          {
            "date": "2022-08-31 16:00:00",
            "value": 4037
          },
          {
            "date": "2022-08-31 17:00:00",
            "value": 2908
          },
          {
            "date": "2022-08-31 18:00:00",
            "value": 780
          },
          {
            "date": "2022-08-31 19:00:00",
            "value": 124
          },
          {
            "date": "2022-08-31 20:00:00",
            "value": 0
          },
          {
            "date": "2022-08-31 21:00:00",
            "value": null
          },
          {
            "date": "2022-08-31 22:00:00",
            "value": 0
          },
          {
            "date": "2022-08-31 23:00:00",
            "value": null
          }
        ]
      },
      "emissions_avoidance": {
        "timeUnit": "HOUR",
        "unit": "Wh",
        "measuredBy": "INVERTER",
        "values": [
          {
            "timestamp": "2022-08-31T05:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T06:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T07:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T08:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T09:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T10:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T11:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-08-31T12:00:00.000Z",
            "energy": 126,
            "emissionsAvoided": 0.20112750000000001
          },
          {
            "timestamp": "2022-08-31T13:00:00.000Z",
            "energy": 601,
            "emissionsAvoided": 0.9582444166666667
          },
          {
            "timestamp": "2022-08-31T14:00:00.000Z",
            "energy": 878,
            "emissionsAvoided": 1.3759723333333334
          },
          {
            "timestamp": "2022-08-31T15:00:00.000Z",
            "energy": 1186,
            "emissionsAvoided": 1.878624
          },
          {
            "timestamp": "2022-08-31T16:00:00.000Z",
            "energy": 2463,
            "emissionsAvoided": 3.841459
          },
          {
            "timestamp": "2022-08-31T17:00:00.000Z",
            "energy": 3513,
            "emissionsAvoided": 5.660614
          },
          {
            "timestamp": "2022-08-31T18:00:00.000Z",
            "energy": 6530,
            "emissionsAvoided": 10.738585
          },
          {
            "timestamp": "2022-08-31T19:00:00.000Z",
            "energy": 6649,
            "emissionsAvoided": 10.944253999999999
          },
          {
            "timestamp": "2022-08-31T20:00:00.000Z",
            "energy": 4928,
            "emissionsAvoided": 8.136128000000001
          },
          {
            "timestamp": "2022-08-31T21:00:00.000Z",
            "energy": 4037,
            "emissionsAvoided": 6.596457999999999
          },
          {
            "timestamp": "2022-08-31T22:00:00.000Z",
            "energy": 2908,
            "emissionsAvoided": 4.618388666666667
          },
          {
            "timestamp": "2022-08-31T23:00:00.000Z",
            "energy": 780,
            "emissionsAvoided": 1.264055
          },
          {
            "timestamp": "2022-09-01T00:00:00.000Z",
            "energy": 124,
            "emissionsAvoided": 0.20402133333333333
          },
          {
            "timestamp": "2022-09-01T01:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-09-01T02:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-09-01T03:00:00.000Z",
            "energy": 0,
            "emissionsAvoided": 0
          },
          {
            "timestamp": "2022-09-01T04:00:00.000Z",
            "energy": null,
            "emissionsAvoided": 0
          }
        ]
      },
      "marginal_grid_emissions_source": "https://api2.watttime.org/v2",
      "issued_from": "Development",
      "certificate_status": "Active",
      "impact_credit": "",
      "interconnection": {
        "energy_injected_utility": "Sample",
        "balancing_authority": ""
      }
    },
    date: "2022-08-31T00:00:00.000Z",
    fileName: "2022-08-31T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json"
  }
]

// Missing the 31th from MOCKS
const mockMonthlyGcs = [
  {
    gc: {
      "metadata": {
        "type": "monthly"
      },
      "timezone": "America/Chicago",
      "energy_carrier": "Electricity",
      "commissioning_date": "2022-08-17",
      "production_interval_start": "2022-8-1",
      "production_interval_end": "2022-8-31",
      "issuance_stamp_date": "2022-09-08T20:17:23.622Z",
      "source": "Solar Power",
      "technology": "Solar PV System",
      "production_device_identifier": "did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0",
      "country": "United States of America",
      "gps": {
        "latitude": "83.2",
        "longitude": "-43.2"
      },
      "ac_capacity": "100.2",
      "dc_capacity": "293.2",
      "wh_generation": [
        {
          "production_interval_start": "2022-08-25T05:00:00.000Z",
          "production_interval_end": "2022-08-26T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-08-25 00:00:00",
                "value": null
              },
              {
                "date": "2022-08-25 01:00:00",
                "value": null
              },
              {
                "date": "2022-08-25 02:00:00",
                "value": null
              },
              {
                "date": "2022-08-25 03:00:00",
                "value": 0
              },
              {
                "date": "2022-08-25 04:00:00",
                "value": null
              },
              {
                "date": "2022-08-25 05:00:00",
                "value": null
              },
              {
                "date": "2022-08-25 06:00:00",
                "value": 0
              },
              {
                "date": "2022-08-25 07:00:00",
                "value": 126
              },
              {
                "date": "2022-08-25 08:00:00",
                "value": 601
              },
              {
                "date": "2022-08-25 09:00:00",
                "value": 878
              },
              {
                "date": "2022-08-25 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-08-25 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-08-25 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-08-25 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-08-25 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-08-25 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-08-25 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-08-25 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-08-25 18:00:00",
                "value": 780
              },
              {
                "date": "2022-08-25 19:00:00",
                "value": 124
              },
              {
                "date": "2022-08-25 20:00:00",
                "value": 0
              },
              {
                "date": "2022-08-25 21:00:00",
                "value": null
              },
              {
                "date": "2022-08-25 22:00:00",
                "value": 0
              },
              {
                "date": "2022-08-25 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-26T05:00:00.000Z",
          "production_interval_end": "2022-08-27T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-08-26 00:00:00",
                "value": null
              },
              {
                "date": "2022-08-26 01:00:00",
                "value": null
              },
              {
                "date": "2022-08-26 02:00:00",
                "value": null
              },
              {
                "date": "2022-08-26 03:00:00",
                "value": 0
              },
              {
                "date": "2022-08-26 04:00:00",
                "value": null
              },
              {
                "date": "2022-08-26 05:00:00",
                "value": null
              },
              {
                "date": "2022-08-26 06:00:00",
                "value": 0
              },
              {
                "date": "2022-08-26 07:00:00",
                "value": 126
              },
              {
                "date": "2022-08-26 08:00:00",
                "value": 601
              },
              {
                "date": "2022-08-26 09:00:00",
                "value": 878
              },
              {
                "date": "2022-08-26 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-08-26 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-08-26 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-08-26 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-08-26 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-08-26 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-08-26 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-08-26 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-08-26 18:00:00",
                "value": 780
              },
              {
                "date": "2022-08-26 19:00:00",
                "value": 124
              },
              {
                "date": "2022-08-26 20:00:00",
                "value": 0
              },
              {
                "date": "2022-08-26 21:00:00",
                "value": null
              },
              {
                "date": "2022-08-26 22:00:00",
                "value": 0
              },
              {
                "date": "2022-08-26 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-27T05:00:00.000Z",
          "production_interval_end": "2022-08-28T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-08-27 00:00:00",
                "value": null
              },
              {
                "date": "2022-08-27 01:00:00",
                "value": null
              },
              {
                "date": "2022-08-27 02:00:00",
                "value": null
              },
              {
                "date": "2022-08-27 03:00:00",
                "value": 0
              },
              {
                "date": "2022-08-27 04:00:00",
                "value": null
              },
              {
                "date": "2022-08-27 05:00:00",
                "value": null
              },
              {
                "date": "2022-08-27 06:00:00",
                "value": 0
              },
              {
                "date": "2022-08-27 07:00:00",
                "value": 126
              },
              {
                "date": "2022-08-27 08:00:00",
                "value": 601
              },
              {
                "date": "2022-08-27 09:00:00",
                "value": 878
              },
              {
                "date": "2022-08-27 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-08-27 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-08-27 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-08-27 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-08-27 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-08-27 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-08-27 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-08-27 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-08-27 18:00:00",
                "value": 780
              },
              {
                "date": "2022-08-27 19:00:00",
                "value": 124
              },
              {
                "date": "2022-08-27 20:00:00",
                "value": 0
              },
              {
                "date": "2022-08-27 21:00:00",
                "value": null
              },
              {
                "date": "2022-08-27 22:00:00",
                "value": 0
              },
              {
                "date": "2022-08-27 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-28T05:00:00.000Z",
          "production_interval_end": "2022-08-29T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-08-28 00:00:00",
                "value": null
              },
              {
                "date": "2022-08-28 01:00:00",
                "value": null
              },
              {
                "date": "2022-08-28 02:00:00",
                "value": null
              },
              {
                "date": "2022-08-28 03:00:00",
                "value": 0
              },
              {
                "date": "2022-08-28 04:00:00",
                "value": null
              },
              {
                "date": "2022-08-28 05:00:00",
                "value": null
              },
              {
                "date": "2022-08-28 06:00:00",
                "value": 0
              },
              {
                "date": "2022-08-28 07:00:00",
                "value": 126
              },
              {
                "date": "2022-08-28 08:00:00",
                "value": 601
              },
              {
                "date": "2022-08-28 09:00:00",
                "value": 878
              },
              {
                "date": "2022-08-28 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-08-28 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-08-28 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-08-28 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-08-28 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-08-28 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-08-28 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-08-28 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-08-28 18:00:00",
                "value": 780
              },
              {
                "date": "2022-08-28 19:00:00",
                "value": 124
              },
              {
                "date": "2022-08-28 20:00:00",
                "value": 0
              },
              {
                "date": "2022-08-28 21:00:00",
                "value": null
              },
              {
                "date": "2022-08-28 22:00:00",
                "value": 0
              },
              {
                "date": "2022-08-28 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-29T05:00:00.000Z",
          "production_interval_end": "2022-08-30T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-08-29 00:00:00",
                "value": null
              },
              {
                "date": "2022-08-29 01:00:00",
                "value": null
              },
              {
                "date": "2022-08-29 02:00:00",
                "value": null
              },
              {
                "date": "2022-08-29 03:00:00",
                "value": 0
              },
              {
                "date": "2022-08-29 04:00:00",
                "value": null
              },
              {
                "date": "2022-08-29 05:00:00",
                "value": null
              },
              {
                "date": "2022-08-29 06:00:00",
                "value": 0
              },
              {
                "date": "2022-08-29 07:00:00",
                "value": 126
              },
              {
                "date": "2022-08-29 08:00:00",
                "value": 601
              },
              {
                "date": "2022-08-29 09:00:00",
                "value": 878
              },
              {
                "date": "2022-08-29 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-08-29 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-08-29 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-08-29 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-08-29 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-08-29 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-08-29 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-08-29 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-08-29 18:00:00",
                "value": 780
              },
              {
                "date": "2022-08-29 19:00:00",
                "value": 124
              },
              {
                "date": "2022-08-29 20:00:00",
                "value": 0
              },
              {
                "date": "2022-08-29 21:00:00",
                "value": null
              },
              {
                "date": "2022-08-29 22:00:00",
                "value": 0
              },
              {
                "date": "2022-08-29 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-31T05:00:00.000Z",
          "production_interval_end": "2022-09-01T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-08-30 00:00:00",
                "value": null
              },
              {
                "date": "2022-08-30 01:00:00",
                "value": null
              },
              {
                "date": "2022-08-30 02:00:00",
                "value": null
              },
              {
                "date": "2022-08-30 03:00:00",
                "value": 0
              },
              {
                "date": "2022-08-30 04:00:00",
                "value": null
              },
              {
                "date": "2022-08-30 05:00:00",
                "value": null
              },
              {
                "date": "2022-08-30 06:00:00",
                "value": 0
              },
              {
                "date": "2022-08-30 07:00:00",
                "value": 126
              },
              {
                "date": "2022-08-30 08:00:00",
                "value": 601
              },
              {
                "date": "2022-08-30 09:00:00",
                "value": 878
              },
              {
                "date": "2022-08-30 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-08-30 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-08-30 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-08-30 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-08-30 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-08-30 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-08-30 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-08-30 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-08-30 18:00:00",
                "value": 780
              },
              {
                "date": "2022-08-30 19:00:00",
                "value": 124
              },
              {
                "date": "2022-08-30 20:00:00",
                "value": 0
              },
              {
                "date": "2022-08-30 21:00:00",
                "value": null
              },
              {
                "date": "2022-08-30 22:00:00",
                "value": 0
              },
              {
                "date": "2022-08-30 23:00:00",
                "value": null
              }
            ]
          }
        }
      ],
      "emissions_avoidance": [
        {
          "production_interval_start": "2022-08-25T05:00:00.000Z",
          "production_interval_end": "2022-08-26T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-08-25T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-25T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-08-25T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-08-25T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-08-25T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-08-25T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-08-25T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-08-25T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-08-25T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-08-25T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-08-25T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-08-25T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-08-25T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-26T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-08-26T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-26T05:00:00.000Z",
          "production_interval_end": "2022-08-27T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-08-26T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-26T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-08-26T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-08-26T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-08-26T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-08-26T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-08-26T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-08-26T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-08-26T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-08-26T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-08-26T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-08-26T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-08-26T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-27T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-08-27T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-27T05:00:00.000Z",
          "production_interval_end": "2022-08-28T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-08-27T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-27T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-08-27T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-08-27T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-08-27T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-08-27T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-08-27T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-08-27T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-08-27T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-08-27T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-08-27T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-08-27T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-08-27T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-28T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-08-28T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-28T05:00:00.000Z",
          "production_interval_end": "2022-08-29T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-08-28T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-28T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-08-28T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-08-28T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-08-28T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-08-28T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-08-28T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-08-28T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-08-28T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-08-28T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-08-28T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-08-28T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-08-28T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-29T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-08-29T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-29T05:00:00.000Z",
          "production_interval_end": "2022-08-30T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-08-29T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-29T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-08-29T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-08-29T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-08-29T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-08-29T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-08-29T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-08-29T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-08-29T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-08-29T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-08-29T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-08-29T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-08-29T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-30T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-08-30T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-08-30T05:00:00.000Z",
          "production_interval_end": "2022-08-31T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-08-30T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-30T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-08-30T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-08-30T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-08-30T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-08-30T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-08-30T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-08-30T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-08-30T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-08-30T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-08-30T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-08-30T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-08-30T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-31T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-08-31T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-31T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-31T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-08-31T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        }
      ],
      "marginal_grid_emissions_source": "https://api2.watttime.org/v2",
      "gc_issuer": "did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5",
      "issued_from": "Development",
      "certificate_status": "Active",
      "impact_credit": "",
      "interconnection": {
        "energy_injected_utility": "Sample",
        "balancing_authority": ""
      }
    },
    date: "2022-08-01",
    fileName: "2022-08-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json"
  },
  {
    gc: {
      "metadata": {
        "type": "monthly"
      },
      "timezone": "America/Chicago",
      "energy_carrier": "Electricity",
      "commissioning_date": "2022-08-17",
      "production_interval_start": "2022-7-1",
      "production_interval_end": "2022-7-31",
      "issuance_stamp_date": "2022-09-08T20:17:23.622Z",
      "source": "Solar Power",
      "technology": "Solar PV System",
      "production_device_identifier": "did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0",
      "country": "United States of America",
      "gps": {
        "latitude": "83.2",
        "longitude": "-43.2"
      },
      "ac_capacity": "100.2",
      "dc_capacity": "293.2",
      "wh_generation": [
        {
          "production_interval_start": "2022-07-25T05:00:00.000Z",
          "production_interval_end": "2022-07-26T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-07-25 00:00:00",
                "value": null
              },
              {
                "date": "2022-07-25 01:00:00",
                "value": null
              },
              {
                "date": "2022-07-25 02:00:00",
                "value": null
              },
              {
                "date": "2022-07-25 03:00:00",
                "value": 0
              },
              {
                "date": "2022-07-25 04:00:00",
                "value": null
              },
              {
                "date": "2022-07-25 05:00:00",
                "value": null
              },
              {
                "date": "2022-07-25 06:00:00",
                "value": 0
              },
              {
                "date": "2022-07-25 07:00:00",
                "value": 126
              },
              {
                "date": "2022-07-25 08:00:00",
                "value": 601
              },
              {
                "date": "2022-07-25 09:00:00",
                "value": 878
              },
              {
                "date": "2022-07-25 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-07-25 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-07-25 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-07-25 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-07-25 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-07-25 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-07-25 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-07-25 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-07-25 18:00:00",
                "value": 780
              },
              {
                "date": "2022-07-25 19:00:00",
                "value": 124
              },
              {
                "date": "2022-07-25 20:00:00",
                "value": 0
              },
              {
                "date": "2022-07-25 21:00:00",
                "value": null
              },
              {
                "date": "2022-07-25 22:00:00",
                "value": 0
              },
              {
                "date": "2022-07-25 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-26T05:00:00.000Z",
          "production_interval_end": "2022-07-27T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-07-26 00:00:00",
                "value": null
              },
              {
                "date": "2022-07-26 01:00:00",
                "value": null
              },
              {
                "date": "2022-07-26 02:00:00",
                "value": null
              },
              {
                "date": "2022-07-26 03:00:00",
                "value": 0
              },
              {
                "date": "2022-07-26 04:00:00",
                "value": null
              },
              {
                "date": "2022-07-26 05:00:00",
                "value": null
              },
              {
                "date": "2022-07-26 06:00:00",
                "value": 0
              },
              {
                "date": "2022-07-26 07:00:00",
                "value": 126
              },
              {
                "date": "2022-07-26 08:00:00",
                "value": 601
              },
              {
                "date": "2022-07-26 09:00:00",
                "value": 878
              },
              {
                "date": "2022-07-26 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-07-26 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-07-26 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-07-26 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-07-26 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-07-26 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-07-26 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-07-26 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-07-26 18:00:00",
                "value": 780
              },
              {
                "date": "2022-07-26 19:00:00",
                "value": 124
              },
              {
                "date": "2022-07-26 20:00:00",
                "value": 0
              },
              {
                "date": "2022-07-26 21:00:00",
                "value": null
              },
              {
                "date": "2022-07-26 22:00:00",
                "value": 0
              },
              {
                "date": "2022-07-26 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-27T05:00:00.000Z",
          "production_interval_end": "2022-07-28T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-07-27 00:00:00",
                "value": null
              },
              {
                "date": "2022-07-27 01:00:00",
                "value": null
              },
              {
                "date": "2022-07-27 02:00:00",
                "value": null
              },
              {
                "date": "2022-07-27 03:00:00",
                "value": 0
              },
              {
                "date": "2022-07-27 04:00:00",
                "value": null
              },
              {
                "date": "2022-07-27 05:00:00",
                "value": null
              },
              {
                "date": "2022-07-27 06:00:00",
                "value": 0
              },
              {
                "date": "2022-07-27 07:00:00",
                "value": 126
              },
              {
                "date": "2022-07-27 08:00:00",
                "value": 601
              },
              {
                "date": "2022-07-27 09:00:00",
                "value": 878
              },
              {
                "date": "2022-07-27 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-07-27 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-07-27 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-07-27 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-07-27 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-07-27 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-07-27 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-07-27 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-07-27 18:00:00",
                "value": 780
              },
              {
                "date": "2022-07-27 19:00:00",
                "value": 124
              },
              {
                "date": "2022-07-27 20:00:00",
                "value": 0
              },
              {
                "date": "2022-07-27 21:00:00",
                "value": null
              },
              {
                "date": "2022-07-27 22:00:00",
                "value": 0
              },
              {
                "date": "2022-07-27 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-28T05:00:00.000Z",
          "production_interval_end": "2022-07-29T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-07-28 00:00:00",
                "value": null
              },
              {
                "date": "2022-07-28 01:00:00",
                "value": null
              },
              {
                "date": "2022-07-28 02:00:00",
                "value": null
              },
              {
                "date": "2022-07-28 03:00:00",
                "value": 0
              },
              {
                "date": "2022-07-28 04:00:00",
                "value": null
              },
              {
                "date": "2022-07-28 05:00:00",
                "value": null
              },
              {
                "date": "2022-07-28 06:00:00",
                "value": 0
              },
              {
                "date": "2022-07-28 07:00:00",
                "value": 126
              },
              {
                "date": "2022-07-28 08:00:00",
                "value": 601
              },
              {
                "date": "2022-07-28 09:00:00",
                "value": 878
              },
              {
                "date": "2022-07-28 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-07-28 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-07-28 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-07-28 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-07-28 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-07-28 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-07-28 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-07-28 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-07-28 18:00:00",
                "value": 780
              },
              {
                "date": "2022-07-28 19:00:00",
                "value": 124
              },
              {
                "date": "2022-07-28 20:00:00",
                "value": 0
              },
              {
                "date": "2022-07-28 21:00:00",
                "value": null
              },
              {
                "date": "2022-07-28 22:00:00",
                "value": 0
              },
              {
                "date": "2022-07-28 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-29T05:00:00.000Z",
          "production_interval_end": "2022-07-30T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-07-29 00:00:00",
                "value": null
              },
              {
                "date": "2022-07-29 01:00:00",
                "value": null
              },
              {
                "date": "2022-07-29 02:00:00",
                "value": null
              },
              {
                "date": "2022-07-29 03:00:00",
                "value": 0
              },
              {
                "date": "2022-07-29 04:00:00",
                "value": null
              },
              {
                "date": "2022-07-29 05:00:00",
                "value": null
              },
              {
                "date": "2022-07-29 06:00:00",
                "value": 0
              },
              {
                "date": "2022-07-29 07:00:00",
                "value": 126
              },
              {
                "date": "2022-07-29 08:00:00",
                "value": 601
              },
              {
                "date": "2022-07-29 09:00:00",
                "value": 878
              },
              {
                "date": "2022-07-29 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-07-29 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-07-29 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-07-29 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-07-29 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-07-29 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-07-29 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-07-29 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-07-29 18:00:00",
                "value": 780
              },
              {
                "date": "2022-07-29 19:00:00",
                "value": 124
              },
              {
                "date": "2022-07-29 20:00:00",
                "value": 0
              },
              {
                "date": "2022-07-29 21:00:00",
                "value": null
              },
              {
                "date": "2022-07-29 22:00:00",
                "value": 0
              },
              {
                "date": "2022-07-29 23:00:00",
                "value": null
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-30T05:00:00.000Z",
          "production_interval_end": "2022-08-31T04:59:59.059Z",
          "wh_generation": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "date": "2022-07-30 00:00:00",
                "value": null
              },
              {
                "date": "2022-07-30 01:00:00",
                "value": null
              },
              {
                "date": "2022-07-30 02:00:00",
                "value": null
              },
              {
                "date": "2022-07-30 03:00:00",
                "value": 0
              },
              {
                "date": "2022-07-30 04:00:00",
                "value": null
              },
              {
                "date": "2022-07-30 05:00:00",
                "value": null
              },
              {
                "date": "2022-07-30 06:00:00",
                "value": 0
              },
              {
                "date": "2022-07-30 07:00:00",
                "value": 126
              },
              {
                "date": "2022-07-30 08:00:00",
                "value": 601
              },
              {
                "date": "2022-07-30 09:00:00",
                "value": 878
              },
              {
                "date": "2022-07-30 10:00:00",
                "value": 1186
              },
              {
                "date": "2022-07-30 11:00:00",
                "value": 2463
              },
              {
                "date": "2022-07-30 12:00:00",
                "value": 3513
              },
              {
                "date": "2022-07-30 13:00:00",
                "value": 6530
              },
              {
                "date": "2022-07-30 14:00:00",
                "value": 6649
              },
              {
                "date": "2022-07-30 15:00:00",
                "value": 4928
              },
              {
                "date": "2022-07-30 16:00:00",
                "value": 4037
              },
              {
                "date": "2022-07-30 17:00:00",
                "value": 2908
              },
              {
                "date": "2022-07-30 18:00:00",
                "value": 780
              },
              {
                "date": "2022-07-30 19:00:00",
                "value": 124
              },
              {
                "date": "2022-07-30 20:00:00",
                "value": 0
              },
              {
                "date": "2022-07-30 21:00:00",
                "value": null
              },
              {
                "date": "2022-07-30 22:00:00",
                "value": 0
              },
              {
                "date": "2022-07-30 23:00:00",
                "value": null
              }
            ]
          }
        }
      ],
      "emissions_avoidance": [
        {
          "production_interval_start": "2022-07-25T05:00:00.000Z",
          "production_interval_end": "2022-07-26T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-07-25T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-25T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-07-25T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-07-25T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-07-25T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-07-25T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-07-25T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-07-25T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-07-25T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-07-25T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-07-25T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-07-25T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-07-25T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-08-26T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-07-26T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-26T05:00:00.000Z",
          "production_interval_end": "2022-07-27T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-07-26T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-26T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-07-26T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-07-26T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-07-26T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-07-26T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-07-26T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-07-26T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-07-26T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-07-26T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-07-26T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-07-26T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-07-26T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-07-27T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-07-27T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-27T05:00:00.000Z",
          "production_interval_end": "2022-07-28T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-07-27T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-27T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-07-27T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-07-27T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-07-27T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-07-27T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-07-27T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-07-27T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-07-27T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-07-27T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-07-27T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-07-27T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-07-27T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-07-28T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-07-28T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-28T05:00:00.000Z",
          "production_interval_end": "2022-07-29T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-07-28T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-28T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-07-28T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-07-28T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-07-28T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-07-28T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-07-28T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-07-28T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-07-28T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-07-28T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-07-28T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-07-28T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-07-28T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-07-29T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-07-29T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-29T05:00:00.000Z",
          "production_interval_end": "2022-07-30T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-07-29T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-29T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-07-29T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-07-29T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-07-29T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-07-29T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-07-29T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-07-29T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-07-29T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-07-29T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-07-29T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-07-29T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-07-29T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-07-30T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-07-30T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        },
        {
          "production_interval_start": "2022-07-30T05:00:00.000Z",
          "production_interval_end": "2022-07-31T04:59:59.059Z",
          "emissions_avoidance": {
            "timeUnit": "HOUR",
            "unit": "Wh",
            "measuredBy": "INVERTER",
            "values": [
              {
                "timestamp": "2022-07-30T05:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T06:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T07:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T08:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T09:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T10:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T11:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-30T12:00:00.000Z",
                "energy": 126,
                "emissionsAvoided": 0.20112750000000001
              },
              {
                "timestamp": "2022-07-30T13:00:00.000Z",
                "energy": 601,
                "emissionsAvoided": 0.9582444166666667
              },
              {
                "timestamp": "2022-07-30T14:00:00.000Z",
                "energy": 878,
                "emissionsAvoided": 1.3759723333333334
              },
              {
                "timestamp": "2022-07-30T15:00:00.000Z",
                "energy": 1186,
                "emissionsAvoided": 1.878624
              },
              {
                "timestamp": "2022-07-30T16:00:00.000Z",
                "energy": 2463,
                "emissionsAvoided": 3.841459
              },
              {
                "timestamp": "2022-07-30T17:00:00.000Z",
                "energy": 3513,
                "emissionsAvoided": 5.660614
              },
              {
                "timestamp": "2022-07-30T18:00:00.000Z",
                "energy": 6530,
                "emissionsAvoided": 10.738585
              },
              {
                "timestamp": "2022-07-30T19:00:00.000Z",
                "energy": 6649,
                "emissionsAvoided": 10.944253999999999
              },
              {
                "timestamp": "2022-07-30T20:00:00.000Z",
                "energy": 4928,
                "emissionsAvoided": 8.136128000000001
              },
              {
                "timestamp": "2022-07-30T21:00:00.000Z",
                "energy": 4037,
                "emissionsAvoided": 6.596457999999999
              },
              {
                "timestamp": "2022-07-30T22:00:00.000Z",
                "energy": 2908,
                "emissionsAvoided": 4.618388666666667
              },
              {
                "timestamp": "2022-07-30T23:00:00.000Z",
                "energy": 780,
                "emissionsAvoided": 1.264055
              },
              {
                "timestamp": "2022-07-31T00:00:00.000Z",
                "energy": 124,
                "emissionsAvoided": 0.20402133333333333
              },
              {
                "timestamp": "2022-07-31T01:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-31T02:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-31T03:00:00.000Z",
                "energy": 0,
                "emissionsAvoided": 0
              },
              {
                "timestamp": "2022-07-31T04:00:00.000Z",
                "energy": null,
                "emissionsAvoided": 0
              }
            ]
          }
        }
      ],
      "marginal_grid_emissions_source": "https://api2.watttime.org/v2",
      "gc_issuer": "did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5",
      "issued_from": "Development",
      "certificate_status": "Active",
      "impact_credit": "",
      "interconnection": {
        "energy_injected_utility": "Sample",
        "balancing_authority": ""
      }
    },
    date: "2022-07-01",
    fileName: "2022-07-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json"
  }
]

export {
  mockWeb3RenewablesIndex,
  mockDailyGCs,
  mockMonthlyGcs
}