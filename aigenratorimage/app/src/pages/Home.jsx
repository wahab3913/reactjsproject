/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import { Card, FormField, Loader } from "../component";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="mt-5 font-bod tex-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div className="font-extrablod text-[#222328] text-[32px]">
          <h1>The commuinty Show Case</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
            DALL-E and DALL-E 2 are deep learning models developed by OpenAI to
            generate digital images from natural language descriptions, called
            "prompts".
          </p>
        </div>
        <div className="mt-16 ">
          <FormField />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center item-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2  grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards data={allPost} title="No Search Result" />
                ) : (
                  <RenderCards data={allPost} title="No results found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
