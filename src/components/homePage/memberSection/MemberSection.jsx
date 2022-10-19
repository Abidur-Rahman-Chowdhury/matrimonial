import { MemoMemberSLider } from "./MemberSLider";

function MemberSection() {
  return (
    <section className="member-slider-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 sr__mleft">
            <div className="content">
              <div className="section-header wow fadeInLeft main__member">
                <h6 className="sub-title extra-padding">Latest Registered</h6>
                <h2 className="title memberFont wow fadeInUp">Members</h2>
                <p className="text">
                  if you have been looking for the someone special of your life
                  for long, then your search ends here
                </p>
              </div>
            </div>
          </div>
          <MemoMemberSLider />
        </div>
      </div>
    </section>
  );
}

export default MemberSection;
