import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="max-w-screen-xl mx-auto mb-10">
      <Helmet>
        <title>IlmMed Solution | Blogs</title>
      </Helmet>
      <main className="mt-10">
        <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative">
          <div
            className="absolute left-0 bottom-0 w-full h-full z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))",
            }}
          ></div>
          <img
            src="https://i.postimg.cc/MKG79c6C/medical-Report.png"
            className="left-0 top-0 w-full z-0 object-cover rounded-lg"
          />
          <div className="p-4 absolute bottom-0 left-0 z-20">
            <Link
              to="/"
              className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
            >
              Health Consultancy
            </Link>
            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            Holistic Health: A Guide to Wellness and Vitality
            </h2>
            <div className="flex mt-3">
              <img
                src="https://i.postimg.cc/zXXzQqnJ/DSC-0015-2.jpg"
                className="h-10 w-10 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-200 text-sm">
                  {" "}
                  Naymul Islam{" "}
                </p>
                <p className="font-semibold text-gray-400 text-xs"> 30 Nov </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
          <p className="pb-6">
            In today&apos;s fast-paced world, maintaining optimal health is more
            crucial than ever. The choices we make in our daily lives
            significantly impact our well-being. This blog aims to provide
            holistic health suggestions, encompassing physical, mental, and
            emotional aspects, to help you achieve and sustain a healthier and
            happier life.
          </p>
          <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">
            Nourish Your Body:
          </h2>
          <p className="pb-6">
            Nutrition plays a pivotal role in overall health. Embrace a balanced
            diet rich in fruits, vegetables, whole grains, lean proteins, and
            healthy fats. Prioritize hydration, aiming for at least eight
            glasses of water a day. Consider consulting a nutritionist to create
            a personalized plan tailored to your specific needs.
          </p>
          <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">
            Regular Exercise Routine:
          </h2>
          <p className="pb-6">
            Physical activity is essential for a healthy body and mind. Find an
            exercise routine that suits your preferences, whether it&apos;s
            jogging, yoga, weightlifting, or dancing. Aim for at least 150
            minutes of moderate-intensity exercise per week. Exercise not only
            keeps your body fit but also releases endorphins, enhancing your
            mood.
          </p>

          <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
            Mental well-being is as crucial as physical health. Practice stress
            management techniques such as mindfulness, meditation, or deep
            breathing exercises. Ensure an adequate amount of sleep to support
            cognitive function and emotional resilience. Seek professional help
            if you&apos;re struggling with persistent stress, anxiety, or
            depression.
          </div>
          <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">
            Quality Sleep:
          </h2>
          <p className="pb-6">
            Quality sleep is a foundation for good health. Create a relaxing
            bedtime routine, limit screen time before sleep, and maintain a
            consistent sleep schedule. Invest in a comfortable mattress and
            pillows to promote restful sleep. Quality sleep contributes to
            better cognitive function, mood regulation, and immune health.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
