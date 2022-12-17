// const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const link_url = 'https://webscraper.io/';
const main_url = link_url + '/test-sites/e-commerce/allinone';
const url = main_url + '/computers/laptops';
const brand = "Lenovo";


// Lists to store every item separately
laptop_name_list = [];
laptop_link_list = [];
laptop_img_list = [];
laptop_price_list = [];
laptop_description_list = [];
laptop_ratings_list = [];
laptop_reviews_list = [];

const lenovo_list_index = [];
const lenovo_notebook = []


axios.get(url)
    .then((res, body) => {
        const $ = cheerio.load(res.data);

        // each element location
        let all_laptops_name = $('h4:odd');
        let all_laptops_description = $('.caption');
        let all_laptops_img = $('.thumbnail');
        let all_laptops_prices = $('.price');
        let all_laptops_reviews = $('.ratings p:even');
        let all_laptops_ratings = $('.ratings p:odd');


        all_laptops_name.each((index, element) => {

            // laptop_name
            collect_laptops = $(element).children('.title').text();
            laptop_names = collect_laptops.replace("...", "")

            // laptop_link
            collect_links = $(element).children('a,.title').attr('href');
            laptop_link = link_url + collect_links

            laptop_name_list.push(
                laptop_names
            )

            laptop_link_list.push(
                laptop_link
            )


            // Getting the index of each laptop name that the name is 'Lenovo'
            if (laptop_names.includes(brand)) {
                lenovo_list_index.push(
                    laptop_link_list.indexOf(laptop_link)
                )
            }
        })

        all_laptops_description.each((index, element) => {
            laptop_description = $(element).children('.description').text();

            laptop_description_list.push(
                laptop_description
            )
        })

        all_laptops_img.each((index, element) => {
            // // laptop img
            img = $(element).children('img').attr('src');

            laptop_img_list.push(
                img
            )
        })

        all_laptops_prices.each((index, element) => {
            // // laptop_price
            collected_prices = $(element).first().text();

            // Remove the  '$' symbol from the value
            prices = collected_prices.replace("$", "");

            laptop_price_list.push(
                prices
            )
        })

        all_laptops_reviews.each((index, element) => {
            // // reviews
            collected_reviews = $(element).first().text();

            // Remove the word 'reviews' from the value
            reviews = collected_reviews.replace(" reviews", "");


            laptop_reviews_list.push(
                reviews
            )

        })
        all_laptops_ratings.each((index, element) => {
            // rating
            ratings = $(element).last().attr('data-rating');

            laptop_ratings_list.push(
                ratings
            )


        })

        // Add all lenovo laptops through their index
        lenovo_list_index.forEach(function (entry) {

            lenovo_notebook.push({

                "Model": laptop_name_list[entry],
                "link": laptop_link_list[entry],
                "image": laptop_img_list[entry],
                "description": laptop_description_list[entry],
                "price": laptop_price_list[entry],
                "ratings": laptop_ratings_list[entry],
                "reviews": laptop_reviews_list[entry]
            })

        })
        // console.log(lenovo_notebook)


    })
    .catch((err) => {
        console.log(err)
    });


module.exports = lenovo_notebook;