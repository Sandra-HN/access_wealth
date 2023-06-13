import React, { Fragment, useEffect, useState } from "react";

import { About,  Experience,  Tech, Projects, Works } from "../components";

function HomePage() {
  return (
    <Fragment>
        <About />
        <Experience />
        <Tech />
        <Works/>
        <Projects />
        {/* <Feedbacks /> */}
        </Fragment>
  )
}

export default HomePage