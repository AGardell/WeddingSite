"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "locations",
      [
        {
          name: "Lucky's Last Chance",
          address: "4421 Main St, Philadelphia, PA 19127",
          website: "http://www.luckyslastchance.com",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "Lively bar with gourmet burgers, craft cocktails & a substantial beer menu, plus dancing upstairs. Avoid the Inferno burger..."
        },
        {
          name: "Philadelphia Zoo",
          address: "1 Riverside Dr, Camden, NJ 08103",
          website: "https://www.adventureaquarium.com",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb: "One of the best laid-out and most animal-packed zoos in the country, the Philadelphia Zoo is set among a charming 42-acre Victorian garden with tree-lined walks, formal shrubbery and animal sculptures."
        },
        {
          name: "The Franklin Institute",
          address: "222 N 20th St, Philadelphia, PA 19103",
          website: "https://www.fi.edu",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb: "Located in the heart of Philadelphia, The Franklin Institute is one of America's most celebrated museums—a renowned leader in science and technology."
        },
        {
          name: "The Pop Shop",
          address: "729 Haddon Ave, Collingswood, NJ 08108",
          website: "http://www.thepopshopusa.com",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "One of our favorite breakfast spots! Michelle and I have a tradition where we grab breakfast here on my birthday. It\'s a little kitchsy but the food is great!"
        },
        {
          name: "Main Street Manayunk",
          address: "4200 Main Street, Philadelphia, PA 19127",
          website: "https://www.visitphilly.com/things-to-do/attractions/main-street-manayunk",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "The heart and soul of the Manayunk, a mercifully level thoroughfare bustling with dozens of restaurants, owner-operated boutiques, bars and galleries."
        },
        {
          name: "The Mütter Museum",
          address: "19 S 22nd St, Philadelphia, PA 19103",
          website: "http://muttermuseum.org/",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "The Mütter Museum helps the public appreciate the mysteries and beauty of the human body while understanding the history of diagnosis and treatment of disease."
        },
        {
          name: "Longwood Gardens",
          address: "1001 Longwood Rd, Kennett Square, PA 19348",
          website: "http://longwoodgardens.org/",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "One of the premier horticultural display gardens in the United States and is open to visitors year-round to enjoy exotic plants and horticulture (both indoor and outdoor), events and performances, seasonal and themed attractions, as well as educational lectures, courses, and workshops."
        },
        {
          name: "The Academy of Natural Sciences of Drexel University",
          address: "1900 Benjamin Franklin Pkwy, Philadelphia, PA 19103",
          website: "https://www.ansp.org/",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "The Academy of Natural Sciences of Drexel University is a leading natural history museum dedicated to advancing research, education, and public engagement in biodiversity and environmental science."
        },
        {
          name: "Dalessandro's Steaks",
          address: "600 Wendover St, Philadelphia, PA 19128",
          website: "https://dalessandros.com/",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "Can\'t visit Philly without enjoying a classic cheese steak. This spot is my favorite but as long as you avoid Pat\'s and/or Geno\'s you\'ll be in good shape."
        },
        {
          name: "Donkey's Too",
          address: "11 Tomlinson Mill Rd, Medford, NJ 08055",
          website: "http://donkeystoo.net/",
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          image: "/images/weddingRing.jpg",
          blurb:
            "I gotta admit I was doubtful when Michelle took me here but Donkey's makes a damn good cheesesteak. Yes I know this isn\'t the original Donkey\'s but Michelle and I can\'t in good conscience recommend anyone travel to Camden."
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('locations', null, {});
  }
};
