import React from "react";
import facebook from "../../5282541_fb_social media_facebook_facebook logo_social network_icon.png";
import linkedin from "../../5282542_linkedin_network_social network_linkedin logo_icon.png";
import instagram from "../../5282544_camera_instagram_social media_social network_instagram logo_icon.png";
import twitter from "../../5282551_tweet_twitter_twitter logo_icon.png";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="row sm:mt-[200] __lg:mt-[100px] __sm:mt-[100px]">
        <div className="col flex flex-wrap items-center">
          <div className="col-lg-4 p-8 ">
            <img
              src="https://thumbs.dreamstime.com/b/conception-bleue-d-illustration-du-fond-de-l-ic%C3%B4ne-abr%C3%A9g%C3%A9-pages-document-isol%C3%A9-sur-la-abstraite-167325917.jpg"
              alt=""
            />
          </div>
          <div className="col-lg-8 p-8">
            <h2 className="text-2xl ">Our Mission</h2>
            <p className="text-sm mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
              asperiores dolor sunt facere accusamus consequatur. Sequi debitis
              iste cupiditate, exercitationem veritatis dolores obcaecati
              dignissimos possimus temporibus. Dolores quos a accusamus! Ad quia
              sed nisi hic, dolores explicabo consectetur beatae ullam minus
              reiciendis ea deserunt error aperiam aspernatur laboriosam
              adipisci? Quaerat iure inventore repellat nam iusto accusamus
              officia eveniet nemo! Optio. Eos, quas delectus. Ducimus dolores
              molestiae hic minus sed tempora enim autem iste exercitationem
              placeat, doloribus rerum eum earum voluptatibus optio maxime sint,
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col flex mb-5 ">
            <div className="col-lg-8 p-8">
              <h2 className="text-2xl ">Our Mission</h2>
              <p className="text-sm mb-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
                asperiores dolor sunt facere accusamus consequatur. Sequi
                debitis iste cupiditate, exercitationem veritatis dolores
                obcaecati dignissimos possimus temporibus. Dolores quos a
                accusamus! Ad quia sed nisi hic, dolores explicabo consectetur
                beatae ullam minus reiciendis ea deserunt error aperiam
                aspernatur laboriosam adipisci? Quaerat iure inventore repellat
                nam iusto accusamus officia eveniet nemo! Optio. Eos, quas
                delectus. Ducimus dolores molestiae hic minus sed tempora enim
                autem iste exercitationem placeat, doloribus rerum eum earum
                voluptatibus optio maxime sint,
              </p>
            </div>

            <div className="col-lg-4 flex justify-center p-2">
              <img
                src="https://thumbs.dreamstime.com/b/pdf-document-page-icon-isolated-abstract-blue-background-illustration-design-pdf-document-page-icon-abstract-blue-background-167325366.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="row flex  justify-center">
          <div className="col-12 p-2 flex  justify-center">
            <h1 className="text-lg">Follow Us On</h1>
          </div>
          <div className="col-3 flex items-center  bg-white/70 rounded-lg">
            <div className="col-3 flex  justify-center p-1">
              <img
                className="w-25 h-25 cursor-pointer hover:scale-105"
                src={facebook}
                alt=""
              />
            </div>
            <div className="col-3 flex justify-center p-1">
              <img
                className="w-25 h-25 cursor-pointer hover:scale-105"
                src={linkedin}
                alt=""
              />
            </div>{" "}
            <div className="col-3 flex justify-center p-1">
              <img
                className="w-25 h-25 cursor-pointer hover:scale-105"
                src={twitter}
                alt=""
              />
            </div>{" "}
            <div className="col-3 flex justify-center p-1">
              <img
                className="w-25 h-25 cursor-pointer hover:scale-105"
                src={instagram}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
