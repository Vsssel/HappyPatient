import { ref } from "vue"

export type BreadCrumb = {
    name: string,
    path: string
}
export const breadcrumbs = ref<BreadCrumb[]>([
    {
        name: 'Doctors',
        path: '/'
    }
])

export const addBreadcrumb = (crumb: BreadCrumb) => {
    const exists = breadcrumbs.value.find(b => b.path === crumb.path)
    if(!exists) {
        breadcrumbs.value.push(crumb)
    }else {
        removeBreadcrumbsAfter(crumb.path)
    }
}

export function removeBreadcrumbsAfter(path: string) {
    const index = breadcrumbs.value.findIndex(crumb => crumb.path === path)
    if (index !== -1) {
      breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
    }
}

export function clearBreadcrumbs() {
    breadcrumbs.value = [];
}

