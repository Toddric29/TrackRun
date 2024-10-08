import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LoadUsers from '../components/UserPage/UserPage';
import AllPlans from '../components/AllPlans/AllPlans';
import PlanDetails from '../components/PlanDetails/PlanDetails';
import CreatePlanForm from '../components/NewPlan/NewPlan';
import UserDetails from '../components/UserDetails/UserDetails';
import EditPlanForm from '../components/UpdatePlan/UpdatePlan';
import LandingPage from '../components/LandingPage/LandingPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "users",
        element: <LoadUsers />,
      },
      {
        path: "training-plans",
        element: <AllPlans />,
      },
      {
        path: "training-plans/:planId",
        element: <PlanDetails />,
      },
      {
        path: "training-plans/new",
        element: <CreatePlanForm />,
      },
      {
        path: "users/:userId",
        element: <UserDetails />,
      },
      {
        path: "training-plans/:planId/edit",
        element: <EditPlanForm />,
      },
    ],
  },
]);
