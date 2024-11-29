export default function Shop({ children }) {
  return (
    <section id="shop" className="w-[70%] my-8 mx-auto">
      <h2 className="uppercase text-[#a59b8b] mb-3">
        Elegant Clothing for everyone
      </h2>
      {children}
    </section>
  );
}
