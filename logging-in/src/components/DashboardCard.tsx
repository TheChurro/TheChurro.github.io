import * as React from "react";

export interface DashboardCardProps {
  uid: number,
  cardColor: string,
  courseName: string,
  courseNickname: string,
  courseTerm: string,
  hasLoaded: boolean
};
export interface DashboardCardState {
};

export default class DashboardCard extends React.Component<DashboardCardProps, DashboardCardState> {
  render() {
    if (this.props.hasLoaded) {
      return (
        <div className="ic-DashboardCard" style={{opacity: 1}} aria-label={this.props.courseName} draggable="false" id={"card" + this.props.uid}>
          <div className="ic-DashboardCard__header">
            <div className="ic-DashboardCard__header_hero" style={{ backgroundColor: this.props.cardColor }} aria-hidden="true"/>
              <div className="ic-DashboardCard__header_content">
                <h2 className="ic-DashboardCard__header-title ellipsis" title="ARTV 10100 4,4 (Winter 2020) Visual Language: On Images">
                  <span style={{color: this.props.cardColor}}>{this.props.courseNickname}</span>
                </h2>
                <div className="ic-DashboardCard__header-subtitle ellipsis" title={this.props.courseName}>{this.props.courseName}</div>
                <div className="ic-DashboardCard__header-term ellipsis" title={this.props.courseTerm}>{this.props.courseTerm}</div>
              </div>
          </div>
          {actionsContainer}
        </div>
      )
    } else {
      return (<div className="ic-DashboardCard" id={"card" + this.props.uid}> {emptyContainer} </div>);
    }
  }
}

const emptyContainer = (
  <svg xmlns="http://www.w3.org/2000/svg" className="ic-DashboardCard__placeholder-svg" version="1.1" x="0" y="0" viewBox="-1087 618 260 254" xmlSpace="preserve">
    <title></title>
    <g className="ic-DashboardCard__placeholder-animates">
      <path d="M-1087 618h260v126h-260V618z" />
      <rect x="-1062" y="759.5" className="st0" width="184" height="16" />
      <rect x="-1062" y="785.5" className="st0" width="106" height="9" />
      <circle cx="-1054" cy="842.5" r="8" />
      <circle cx="-989" cy="842.5" r="8" />
      <circle cx="-924" cy="842.5" r="8" />
      <circle cx="-859" cy="842.5" r="8" />
    </g>
  </svg>
);

const iconAnnouncement = (<svg name="IconAnnouncement" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" className="esvoZ_bGBk esvoZ_drOs esvoZ_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh">
  <g role="presentation">
    <path
      d="M1920 847.053c0 136.32-97.13 250.503-225.882 276.705v513.883c0 26.202-17.958 49.016-43.483 55.002a57.279 57.279 0 0 1-12.988 1.468c-21.12 0-40.772-11.745-50.485-31.171C1379.238 1247.203 964.18 1242.347 960 1242.347H564.706v564.706h87.755c-11.859-90.127-17.506-247.003 63.473-350.683 52.405-67.087 129.657-101.082 229.948-101.082v112.941c-64.49 0-110.57 18.861-140.837 57.487-68.781 87.868-45.064 263.83-30.269 324.254 4.18 16.828.34 34.673-10.277 48.34-10.73 13.665-27.219 21.684-44.499 21.684H508.235c-31.171 0-56.47-25.186-56.47-56.47v-621.177h-56.47c-155.747 0-282.354-126.607-282.354-282.353v-56.47h-56.47C25.299 903.523 0 878.336 0 847.052c0-31.172 25.299-56.471 56.47-56.471h56.471v-56.47c0-155.634 126.607-282.354 282.353-282.354h564.593c16.941-.112 420.48-7.002 627.275-420.48 11.52-23.491 37.27-35.689 63.473-29.816 25.525 6.099 43.483 28.8 43.483 55.002V570.46C1822.87 596.662 1920 710.733 1920 847.053zm-225.882 159.02c65.618-23.378 112.94-85.496 112.94-159.02 0-73.525-47.322-135.53-112.94-158.909v317.93zm-112.942 438.438V249.707c-194.71 242.371-452.216 298.164-564.705 311.04v572.724c112.489 12.876 369.995 68.556 564.705 311.04zM903.53 1129.406V564.7H395.294c-93.402 0-169.412 76.01-169.412 169.411v225.883c0 93.402 76.01 169.412 169.412 169.412H903.53z"
      fill-rule="evenodd"
      stroke="none"
      stroke-width="1"></path>
  </g>
</svg>);

const iconAssigment = (<svg name="IconAssignment" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" className="esvoZ_bGBk esvoZ_drOs esvoZ_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh">
  <g role="presentation">
    <path
      d="M1903.483 807.19c22.023 22.023 22.023 57.712 0 79.848l-677.638 677.637c-10.616 10.504-24.96 16.49-39.98 16.49h-225.88c-31.17 0-56.469-25.299-56.469-56.47v-225.88c0-15.02 5.986-29.364 16.49-39.867l677.636-677.637c22.137-22.136 57.825-22.136 79.962 0l225.879 225.879zM1668.23 962.482l115.424-115.424-146.031-146.031-115.424 115.424 146.03 146.03zm-505.744 505.743l425.895-425.895-146.03-146.03-425.895 425.894v146.031h146.03zM0 0h1468.214v564.698h-112.94V112.94H112.94v1694.092h1242.334v-225.879h112.94v338.819H0V0zm338.819 790.588V338.83h790.576v451.758H338.82zm112.94-112.94h564.697V451.77H451.758v225.88zm-112.94 451.758v-112.94h564.697v112.94H338.82zm0 225.88v-112.94h338.818v112.94H338.82z"
      fill-rule="evenodd"
      stroke="none"
      stroke-width="1"></path>
  </g>
</svg>);

const iconDiscussion = (<svg name="IconDiscussion" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" className="esvoZ_bGBk esvoZ_drOs esvoZ_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh">
  <g role="presentation">
    <path
      d="M677.647 16v338.936h112.941V129.054h1016.47V919.53h-225.994v259.765L1321.412 919.53h-79.172V467.878H0v1016.47h338.71v418.9l417.996-418.9h485.534v-451.877h32.753l419.125 419.124v-419.124H1920V16H677.647zM338.79 919.563h564.706v-112.94H338.79v112.94zm0 225.883h338.936v-113.054H338.79v113.054zM112.94 580.706h1016.47v790.701H710.4L451.652 1631.06v-259.652h-338.71V580.706z"
      fill-rule="evenodd"
      stroke="none"
      stroke-width="1"></path>
  </g>
</svg>);

const actionsContainer = (
  <nav className="ic-DashboardCard__action-container" aria-label="Actions">
    <div className="ic-DashboardCard__action announcements">
      <div className="ic-DashboardCard__action-layout">{iconAnnouncement}</div>
    </div>
    <div className="ic-DashboardCard__action assignments">
      <div className="ic-DashboardCard__action-layout">{iconAssigment}</div>
    </div>
    <div className="ic-DashboardCard__action discussion">
      <div className="ic-DashboardCard__action-layout">{iconDiscussion}</div>
    </div>
  </nav>
)
