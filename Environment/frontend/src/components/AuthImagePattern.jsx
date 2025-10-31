import { ChevronLeft, ChevronRight } from "lucide-react";
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div class="carousel w-full">
      <div id="slide1" class="carousel-item relative w-full">
        <img
          src="/casey-horner-k6v6Oy2kmao-unsplash.jpg"
          className="w-full"
          alt="A small carnival fair in the night time"
        />
        <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" class="btn btn-circle">
            <ChevronLeft/>
          </a>
          <a href="#slide2" class="btn btn-circle">
            <ChevronRight/>
          </a>
        </div>
      </div>
      <div id="slide2" class="carousel-item relative w-full">
        <img
          src="/samantha-gades-fIHozNWfcvs-unsplash.jpg"
          class="w-full"
          alt="A group of people around a stage underneath a gazebo."
        />
        <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" class="btn btn-circle">
            <ChevronLeft/>
          </a>
          <a href="#slide3" class="btn btn-circle">
            <ChevronRight/>
          </a>
        </div>
      </div>
      <div id="slide3" class="carousel-item relative w-full">
        <img
          src="/kate-trysh-E5xQlNnngO0-unsplash.jpg"
          class="w-full"
          alt="An outdoor event filled with people"
        />
        <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" class="btn btn-circle">
            <ChevronLeft/>
          </a>
          <a href="#slide4" class="btn btn-circle">
            <ChevronRight/>
          </a>
        </div>
      </div>
      <div id="slide4" class="carousel-item relative w-full">
        <img
          src="/andy-wang-o_82Kgh6DXU-unsplash.jpg"
          class="w-full"
          alt="Small college outdoor event with colorful building in the background"
        />
        <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" class="btn btn-circle">
            <ChevronLeft/>
          </a>
          <a href="#slide1" class="btn btn-circle">
            <ChevronRight/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
