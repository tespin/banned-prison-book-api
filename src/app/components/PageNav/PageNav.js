import React from "react";
import FlexContainer from "../FlexContainer";
import Link from "next/link";

function PageNav({ currentPage, numPages }) {
  const pagesArr = Array.from({ length: numPages }, (val, index) => index);

  <FlexContainer>
    <ul>
      {pagesArr.map((page) => {
        <li>
          <Link href={`/${page}`}>{page}</Link>
        </li>;
      })}
    </ul>
  </FlexContainer>;
}

export default PageNav;
