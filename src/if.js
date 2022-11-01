/**
 *
 * @param {object} props
 * @param {boolean} props.condition
 * @param  {import('react').ReactNode} props.children
 * @returns
 */
export default function If({ condition = false, children }) {
  return condition ? <>{children}</> : null
}
