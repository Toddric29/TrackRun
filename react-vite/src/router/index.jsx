import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LoadUsers from '../components/UserPage/UserPage';
import AllPlans from '../components/AllPlans/AllPlans';
import PlanDetails from '../components/PlanDetails/PlanDetails';
import CreatePlanForm from '../components/NewPlan/NewPlan';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
    ],
  },
]);
