import IngredientsTable from "@/components/UI/tables/ingredients";
import IngridientForm from "@/forms/ingridient.form";

const IngredientsPage = () => {
  return (
    <div>
      <IngridientForm />
      <IngredientsTable />
    </div>
  );
};

export default IngredientsPage;
