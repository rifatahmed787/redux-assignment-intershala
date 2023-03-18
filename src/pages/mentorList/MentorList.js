import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setMentors,
  setSortBy,
} from "../../features/mentorSlice/mentorSlice.js";
import axios from "axios";

const MentorList = () => {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.mentors.mentors);
  console.log(mentors);
  const sortBy = useSelector((state) => state.mentors.filters.sortBy);
  const category = useSelector((state) => state.mentors.filters.category);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://dev.mentorclan.com/api/mentors");
      //   console.log(result.data.data);
      dispatch(setMentors(result.data.data));
    };
    fetchData();
  }, [dispatch]);

  //sorting by price
  const handleSortByChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  //filtering by categories wise
  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  let filteredMentors = mentors;

  //sorting
  if (sortBy) {
    filteredMentors = [...filteredMentors].sort((a, b) =>
      sortBy === "highestToLowest"
        ? b.minimumPrice - a.minimumPrice
        : a.minimumPrice - b.minimumPrice
    );
  }

  //filtering
  if (category) {
    filteredMentors = filteredMentors.filter((mentor) =>
      mentor.categories.includes(category)
    );
  }

  let content;
  if (mentors.length) {
    content = (
      <>
        <div className="flex justify-center space-x-10 pt-16 pb-20">
          <div className="">
            <span className="mr-3 font-semibold text-white">Sort by:</span>
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-white bg-[#1A2238] text-white"
            >
              <option value="">All</option>
              <option value="lowestToHighest">Lowest to highest price</option>
              <option value="highestToLowest">Highest to lowest price</option>
            </select>
          </div>
          <div>
            <span className="mr-3 font-semibold text-white">
              Filter by category:
            </span>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border border-white bg-[#1A2238] text-white"
            >
              <option value="">All</option>
              <option value="exam_assist">Exam Assist</option>
              <option value="job_assist">Job Assist</option>
              <option value="admit_assist">Admit Assist</option>
            </select>
          </div>
        </div>
        <ul className="grid grid-cols-2 justify-items-center gap-4 pb-16">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor._id}
              className="flex flex-col  shadow-2xl bg-[#1A2238] border justify-center w-96 p-6  rounded-xl sm:px-12 text-white"
            >
              <img
                src={mentor.profileImg}
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
              />
              <div className="space-y-4 text-center divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {mentor.name}
                  </h2>
                  <h5>{mentor.username}</h5>
                  <p>{mentor.categories.join(", ")}</p>
                  <p>
                    <span>City: </span>
                    {mentor.city}
                  </p>
                  <p>
                    <span>Price: </span>
                    {mentor.minimumPrice}
                  </p>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                    About: {mentor.about.slice(0, 30)}
                  </p>
                  <p>{mentor.skills.join(", ")}</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </>
    );
  }

  return <div>{content}</div>;
};

export default MentorList;
