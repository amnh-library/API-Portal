# API Portal

[You can find the original Hack The Stacks hackathon presentation here.](https://docs.google.com/presentation/d/163vev-7-nU701YB1IRpbRkR4BonHA5CvfoCKCICpUQs/edit?usp=sharing)

## Configuring the API

Before attempting to scrape data or build an ElasticSearch index, you must set the following environment variables:

* ELASTICSEARCH_DEV (address of ElasticSearch server)
* OMEKA_API_KEY
* SIERRA_API_KEY
* SIERRA_API_SECRET

## Connecting to the API

The Library API is currently only internally available on AMNH servers at this address:
'''
http://api-dev.library.amnh.org/<ROUTE>
'''

Substitute `<ROUTE>` with one of the routes listed below.

## Search APIs
All search APIs support filtering via query params. Ex:
**/search?q=Asiatic**

### /search
**Note**: The search endpoint results are largely unstructured.
```json
[
  {
    "id": "/agents/corporate_entities/132",
    "title": "Central Asiatic Expeditions (1921-1930)",
    "primary_type": "agent_corporate_entity",
    "types": [
      "agent_corporate_entity",
      "agent"
    ]
  }
]
```

### /image
```json
[
  "http://lbry-web-007.amnh.org/digital/files/original/297702703c355792da5aee71b242bac8.jpg",
  "http://lbry-web-007.amnh.org/digital/files/original/f2369cbc0cec108b08c2e3d9ea3c8bff.jpg",
  "http://lbry-web-007.amnh.org/digital/files/original/9a773b7231a3518bbef778d75702fdeb.jpg",
]
```

## REST APIs
All APIs support filtering via query params. Ex:
**/people?name=Abbott, Charles G.**

### /people
```json
[
  {
    "name": "Abbott, Charles G.",
    "id": "amnhp_1000001"
  },
  {
    "name": "Abbott, Clinton G. (Clinton Gilbert), 1881-1946",
    "id": "amnhp_1000002"
  }
]
```

### /people/:id
```json
{
  "id": "amnhp_1000001",
  "description": "Secretary of Smithsonian Institution, astrophysicist",
  "existDates": {
    "start": -3079540800000,
    "end": 124952400000
  },
  "name": {
    "first": "Charles G",
    "last": "Abbott"
  }
}
```

### /expeditions
```json
[
  {
    "name": "(Bahamas 1887)",
    "id": "amnhc_2000001"
  },
  {
    "name": "Elliott-Richardson Expedition to Montana",
    "id": "amnhc_2000002"
  }
]
```

### /expeditions/:id
```json
{
  "id": "amnhc_2000001",
  "description": "Sources: Nothing found in Annual Reports for  85-86, 86-87, 87-88; nor in Library Exped. Vertical files.  Only reference is in this spreadsheet",
  "date": "1887",
  "place": "Bahamas",
  "name": "(Bahamas 1887)"
}
```

### /departments
```json
[
  {
    "name": "American Museum of Natural History. Department of Animal Behavior",
    "id": "amnhc_3000001"
  },
  {
    "name": "American Museum of Natural History. Department of Experimental Biology",
    "id": "amnhc_3000002"
  }
]
```

### /departments/:id
#### Under Construction

### /exhibitions
```json
[
  {
    "name": "What America is Doing for Western Asia and North Africa through the Syrian Protestant College",
    "permanent": false,
    "id": "amnhc_5000001"
  },
  {
    "name": "Illustrating the Cotton-Boll Weevil",
    "permanent": false,
    "id": "amnhc_5000002"
  }
]
```

### /exhibitions/:id
**NOTE** - Only permanent exhibitions have an available detailed view

```json
{
  "id": "amnhc_4000078",
  "description": [
    "The Milstein Hall of Advanced Mammals features extinct mammal relatives such as mammoths, mastodons, saber-toothed cats, camels, and giant ground sloths, which roamed North America until about 10,000 years ago. These species became extinct, possibly due to climate changes at the end of the last ice age, hunting by humans, and infectious disease.",
    "This hall also includes mammals with such modern traits as the hoof, a stirrup-shaped ear bone, and eye sockets near the snout, as well as traits found in primitive mammals: the synapsid opening in the skull, three middle ear bones, and the placenta. Among the animals represented are bats, rodents, rabbits, cats, seals, bears, primates, deer, horses, whales, and elephants. (source: AMNH website, accessed October 18, 2016)",
    "Information for the hall appears in the following museum publications:",
    "American Museum of Natural History Annual Reports from years\n\t\t\t\t\t1993 (page 81); 1994 (page 5)",
    "American Museum of Natural History Original Guides for years\n\t\t\t\t\t1993 (page 50); \n\t\t\t\t\t2001 (page 50)",
    "American Museum of Natural History Floor Plan, Summer 2012"
  ],
  "abstract": "Current hall. Opened June 1994. The Paul and Irma Milstein Hall of Advanced Mammals is one of two halls in the Lila Acheson Wallace Wing of Mammals and Their Extinct Relatives, which together tell of the great diversification and sudden extinctions of this group of animals. The roots of the mammalian line reach back almost 300 million years, but the mammals featured in this hall, including both primitive and advanced species, arose after the extinction of the non-avian dinosaurs.",
  "place": "AMNH: Floor 4, Section 3.",
  "names": [
    {
      "name": "Paul and Irma Milstein Hall of Advanced Mammals."
    },
    {
      "name": "Paul and Irma Milstein Hall of Advanced Mammals",
      "dates": [
        "1993",
        "1994",
        "2001"
      ]
    },
    {
      "name": "Advanced Mammals",
      "dates": "1993"
    },
    {
      "name": "Milstein Hall of Advanced Mammals",
      "dates": "2012"
    }
  ]
}
```

## xEac

- people: amnhp_1
- expedition: amnhc_2
- department: amnhc_3
- hall: amnhc_4

## Contributing
Refer to the [contributing](CONTRIBUTING.md) docs.
