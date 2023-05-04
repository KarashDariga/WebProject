export interface Events{
  id: number;
  title: string;
  desc: string;
  info: string;
  company: number;
  category: number;
  // title = models.CharField(max_length=255)
  // desc = models.TextField()
  // info = models.TextField()
  // date = models.DateField(auto_now=True)
  // category = models.ForeignKey("Category", on_delete=models.CASCADE)
  // company = models.ForeignKey("Company", on_delete=models.CASCADE)
}
export interface Category {
  id: number;
  name: string;
}

// company.model.ts
export interface Company {
  id: number;
  name: string;
}
export interface Token {
  token: string;
}
export interface LoginData {
  username: string,
  password: string
}
