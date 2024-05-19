import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

interface CourseDate {
  total: number;
  image: string;
  count: number;
}

const getTopCourse = (grouped: { [courseTitle: string]: CourseDate }) => {

  const arrGroup = Object.entries(grouped).map(([courseTitle, detail]) => ({
    name: courseTitle,
    total: detail?.total,
    image: detail?.image,
    count: detail?.count
  }));

  const arrSort = arrGroup.sort((a: any, b: any) => b.total - a.total)

  const arrTop5 = arrSort.slice(0, 5)

  return arrTop5;
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: CourseDate } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = {
        total: 0,
        image: purchase?.course?.imageUrl || " ",
        count: 0
      };
    }
    grouped[courseTitle].count++;
    grouped[courseTitle].total += purchase.course.price!;
  });

  const arrTop5 = getTopCourse(grouped)
  return arrTop5;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
      }
    });

    const data = groupByCourse(purchases);
    
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = data.reduce((acc, cur) => acc + cur.count, 0)

    return {
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}