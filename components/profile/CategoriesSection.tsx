import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import CreateCategoryDialog from "./CreateCategoryDialog";
import CategoryItem from "./CategoryItem";
import { User } from "@prisma/client";

export default async function CategoriesSection({
  user,
}: {
  user: User;
}) {
  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
  });
  const incomeCategories = categories.filter(
    (category) => category.type === "income"
  );
  const expenseCategories = categories.filter(
    (category) => category.type === "expense"
  );
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter sm:text-left text-center">
            {" - "}Categories{" - "}
          </CardTitle>
          <CardDescription className="sm:text-left text-center">
            Manage your categories here.
          </CardDescription>
        </div>
        <CreateCategoryDialog />
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">
            No categories found. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="bg-secondary px-2">
              <h2 className="text-center text-green-500 font-bold text-xl">Income</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomeCategories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </div>
            </Card>
            <Card className="bg-secondary px-2">
              <h2 className="text-center text-red-500 font-bold text-xl">Expense</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expenseCategories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
